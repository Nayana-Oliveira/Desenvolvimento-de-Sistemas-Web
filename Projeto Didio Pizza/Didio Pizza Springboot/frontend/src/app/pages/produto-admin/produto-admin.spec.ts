import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAdmin } from './produto-admin';

describe('ProdutoAdmin', () => {

  let component: ProdutoAdmin;

  let fixture: ComponentFixture<ProdutoAdmin>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ProdutoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoAdmin);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});