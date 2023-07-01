import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent {
  get activeUser() {
    return this.auth.activeUser;
  }
  magia = 'magia';
  editMode: boolean = false;
  classOptions: string[] = [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard',
    'Blood Hunter',
    'Artificer',
  ];

  characterForm: FormGroup = this.fb.group({
    characterName: ['', [Validators.required]],
    characterRace: ['', [Validators.required]],
    characterDescription: ['', [Validators.required]],
    characterClass: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.api
      .getCharactersheetByUserId(this.activeUser.id)
      .subscribe(character => {
        if (character) {
          const { _id, creator, ...rest } = character;
          this.magia = _id;
          this.characterForm.setValue(rest);
          this.characterForm.disable();
        }
      });
  }

  updateCharacter() {
    this.api
      .updateCharactersheet(this.magia, this.characterForm.value)
      .subscribe(res => {
        this.toastr.success('Character sheet updated!');
        this.characterForm.disable();
        this.editMode = false;
      });
  }
}
