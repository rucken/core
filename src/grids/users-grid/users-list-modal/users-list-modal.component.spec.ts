import { TestBed, inject } from '@angular/core/testing';

import { UsersListModalComponent } from './users-list-modal.component';

describe('a users-list-modal component', () => {
    let component: UsersListModalComponent;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UsersListModalComponent
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([UsersListModalComponent], (UsersListModalComponent) => {
        component = UsersListModalComponent;
    }));

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});