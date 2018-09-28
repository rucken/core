'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">rucken:web</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="changelog.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>CHANGELOG
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AuthModalModule.html" data-type="entity-link">AuthModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AuthModalModule-3fdc4b4846259c0fdfb7273ceb9e1dd8"' : 'data-target="#xs-components-links-module-AuthModalModule-3fdc4b4846259c0fdfb7273ceb9e1dd8"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AuthModalModule-3fdc4b4846259c0fdfb7273ceb9e1dd8"' : 'id="xs-components-links-module-AuthModalModule-3fdc4b4846259c0fdfb7273ceb9e1dd8"' }>
                                        <li class="link">
                                            <a href="components/AuthModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentTypeInputModule.html" data-type="entity-link">ContentTypeInputModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypeInputModule-450d6dead11ea552dd87a9b80f4592cc"' : 'data-target="#xs-components-links-module-ContentTypeInputModule-450d6dead11ea552dd87a9b80f4592cc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypeInputModule-450d6dead11ea552dd87a9b80f4592cc"' : 'id="xs-components-links-module-ContentTypeInputModule-450d6dead11ea552dd87a9b80f4592cc"' }>
                                        <li class="link">
                                            <a href="components/ContentTypeInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypeInputComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentTypeModalModule.html" data-type="entity-link">ContentTypeModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypeModalModule-b647c56959a201dfe6bc54364d7ff269"' : 'data-target="#xs-components-links-module-ContentTypeModalModule-b647c56959a201dfe6bc54364d7ff269"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypeModalModule-b647c56959a201dfe6bc54364d7ff269"' : 'id="xs-components-links-module-ContentTypeModalModule-b647c56959a201dfe6bc54364d7ff269"' }>
                                        <li class="link">
                                            <a href="components/ContentTypeModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypeModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentTypeSelectModule.html" data-type="entity-link">ContentTypeSelectModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypeSelectModule-ada55cd7c5162f39b7fadbd498dbd018"' : 'data-target="#xs-components-links-module-ContentTypeSelectModule-ada55cd7c5162f39b7fadbd498dbd018"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypeSelectModule-ada55cd7c5162f39b7fadbd498dbd018"' : 'id="xs-components-links-module-ContentTypeSelectModule-ada55cd7c5162f39b7fadbd498dbd018"' }>
                                        <li class="link">
                                            <a href="components/ContentTypeSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypeSelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentTypesGridModalModule.html" data-type="entity-link">ContentTypesGridModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypesGridModalModule-fc6fcd3e7f4b5d1300fb64cae2293998"' : 'data-target="#xs-components-links-module-ContentTypesGridModalModule-fc6fcd3e7f4b5d1300fb64cae2293998"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypesGridModalModule-fc6fcd3e7f4b5d1300fb64cae2293998"' : 'id="xs-components-links-module-ContentTypesGridModalModule-fc6fcd3e7f4b5d1300fb64cae2293998"' }>
                                        <li class="link">
                                            <a href="components/ContentTypesGridModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesGridModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentTypesGridModule.html" data-type="entity-link">ContentTypesGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypesGridModule-78cede5ed6b763bb0a21a7bcc6001166"' : 'data-target="#xs-components-links-module-ContentTypesGridModule-78cede5ed6b763bb0a21a7bcc6001166"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypesGridModule-78cede5ed6b763bb0a21a7bcc6001166"' : 'id="xs-components-links-module-ContentTypesGridModule-78cede5ed6b763bb0a21a7bcc6001166"' }>
                                        <li class="link">
                                            <a href="components/ContentTypesGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DirectivesModule.html" data-type="entity-link">DirectivesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-DirectivesModule-0a94c292c1db51e8b2f3972d6b79c792"' : 'data-target="#xs-directives-links-module-DirectivesModule-0a94c292c1db51e8b2f3972d6b79c792"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-DirectivesModule-0a94c292c1db51e8b2f3972d6b79c792"' : 'id="xs-directives-links-module-DirectivesModule-0a94c292c1db51e8b2f3972d6b79c792"' }>
                                        <li class="link">
                                            <a href="directives/DisableControlDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DisableControlDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FocusedDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FocusedDirective</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EntityGridModalModule.html" data-type="entity-link">EntityGridModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityGridModalModule-92e905e8afc9be20dc10d4d24012ce07"' : 'data-target="#xs-components-links-module-EntityGridModalModule-92e905e8afc9be20dc10d4d24012ce07"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityGridModalModule-92e905e8afc9be20dc10d4d24012ce07"' : 'id="xs-components-links-module-EntityGridModalModule-92e905e8afc9be20dc10d4d24012ce07"' }>
                                        <li class="link">
                                            <a href="components/EntityGridModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityGridModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EntityGridModule.html" data-type="entity-link">EntityGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityGridModule-f0debba4245e6999d51c8d07c08b928d"' : 'data-target="#xs-components-links-module-EntityGridModule-f0debba4245e6999d51c8d07c08b928d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityGridModule-f0debba4245e6999d51c8d07c08b928d"' : 'id="xs-components-links-module-EntityGridModule-f0debba4245e6999d51c8d07c08b928d"' }>
                                        <li class="link">
                                            <a href="components/EntityGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EntityInputModule.html" data-type="entity-link">EntityInputModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityInputModule-7109a5e2ee6239749a291c7bcdcc2a99"' : 'data-target="#xs-components-links-module-EntityInputModule-7109a5e2ee6239749a291c7bcdcc2a99"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityInputModule-7109a5e2ee6239749a291c7bcdcc2a99"' : 'id="xs-components-links-module-EntityInputModule-7109a5e2ee6239749a291c7bcdcc2a99"' }>
                                        <li class="link">
                                            <a href="components/EntityInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityInputComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EntityModalModule.html" data-type="entity-link">EntityModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityModalModule-e133c9e08491307eabf6269c263ed50d"' : 'data-target="#xs-components-links-module-EntityModalModule-e133c9e08491307eabf6269c263ed50d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityModalModule-e133c9e08491307eabf6269c263ed50d"' : 'id="xs-components-links-module-EntityModalModule-e133c9e08491307eabf6269c263ed50d"' }>
                                        <li class="link">
                                            <a href="components/EntityModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EntitySelectModule.html" data-type="entity-link">EntitySelectModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntitySelectModule-73544b36ddb0ee440e9e2730c247d396"' : 'data-target="#xs-components-links-module-EntitySelectModule-73544b36ddb0ee440e9e2730c247d396"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntitySelectModule-73544b36ddb0ee440e9e2730c247d396"' : 'id="xs-components-links-module-EntitySelectModule-73544b36ddb0ee440e9e2730c247d396"' }>
                                        <li class="link">
                                            <a href="components/EntitySelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntitySelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/FormGroupModule.html" data-type="entity-link">FormGroupModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-FormGroupModule-713f2f8159c31e35d6da577fb93e1aff"' : 'data-target="#xs-components-links-module-FormGroupModule-713f2f8159c31e35d6da577fb93e1aff"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-FormGroupModule-713f2f8159c31e35d6da577fb93e1aff"' : 'id="xs-components-links-module-FormGroupModule-713f2f8159c31e35d6da577fb93e1aff"' }>
                                        <li class="link">
                                            <a href="components/FormGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormGroupComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupInputModule.html" data-type="entity-link">GroupInputModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupInputModule-722fadcf87a9cd80d921080aec4e0e33"' : 'data-target="#xs-components-links-module-GroupInputModule-722fadcf87a9cd80d921080aec4e0e33"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupInputModule-722fadcf87a9cd80d921080aec4e0e33"' : 'id="xs-components-links-module-GroupInputModule-722fadcf87a9cd80d921080aec4e0e33"' }>
                                        <li class="link">
                                            <a href="components/GroupInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupInputComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupModalModule.html" data-type="entity-link">GroupModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupModalModule-5c546a68ccbc1d599d8f95560d50016a"' : 'data-target="#xs-components-links-module-GroupModalModule-5c546a68ccbc1d599d8f95560d50016a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupModalModule-5c546a68ccbc1d599d8f95560d50016a"' : 'id="xs-components-links-module-GroupModalModule-5c546a68ccbc1d599d8f95560d50016a"' }>
                                        <li class="link">
                                            <a href="components/GroupModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupPermissionsGridModule.html" data-type="entity-link">GroupPermissionsGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupPermissionsGridModule-09f1870ed3f8f780fa45dbf4b3c5690e"' : 'data-target="#xs-components-links-module-GroupPermissionsGridModule-09f1870ed3f8f780fa45dbf4b3c5690e"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupPermissionsGridModule-09f1870ed3f8f780fa45dbf4b3c5690e"' : 'id="xs-components-links-module-GroupPermissionsGridModule-09f1870ed3f8f780fa45dbf4b3c5690e"' }>
                                        <li class="link">
                                            <a href="components/GroupPermissionsGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupPermissionsGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupSelectModule.html" data-type="entity-link">GroupSelectModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupSelectModule-dda9d86be3f3cb43b939e9a54a91e454"' : 'data-target="#xs-components-links-module-GroupSelectModule-dda9d86be3f3cb43b939e9a54a91e454"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupSelectModule-dda9d86be3f3cb43b939e9a54a91e454"' : 'id="xs-components-links-module-GroupSelectModule-dda9d86be3f3cb43b939e9a54a91e454"' }>
                                        <li class="link">
                                            <a href="components/GroupSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupSelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupsGridModalModule.html" data-type="entity-link">GroupsGridModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupsGridModalModule-8ea831dbf0f83cad7e102fdeee520e6a"' : 'data-target="#xs-components-links-module-GroupsGridModalModule-8ea831dbf0f83cad7e102fdeee520e6a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupsGridModalModule-8ea831dbf0f83cad7e102fdeee520e6a"' : 'id="xs-components-links-module-GroupsGridModalModule-8ea831dbf0f83cad7e102fdeee520e6a"' }>
                                        <li class="link">
                                            <a href="components/GroupsGridModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsGridModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupsGridModule.html" data-type="entity-link">GroupsGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupsGridModule-54bd0ee106cba4ffece16ebb96263720"' : 'data-target="#xs-components-links-module-GroupsGridModule-54bd0ee106cba4ffece16ebb96263720"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupsGridModule-54bd0ee106cba4ffece16ebb96263720"' : 'id="xs-components-links-module-GroupsGridModule-54bd0ee106cba4ffece16ebb96263720"' }>
                                        <li class="link">
                                            <a href="components/GroupsGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MessageModalModule.html" data-type="entity-link">MessageModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' : 'data-target="#xs-components-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' : 'id="xs-components-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' }>
                                        <li class="link">
                                            <a href="components/MessageModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' : 'data-target="#xs-injectables-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' : 'id="xs-injectables-links-module-MessageModalModule-f7c854cdf8de8220c582f13a45adcd52"' }>
                                        <li class="link">
                                            <a href="injectables/MessageModalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MessageModalService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NavSidebarModule.html" data-type="entity-link">NavSidebarModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NavSidebarModule-276e6120f9ebf5853436a4e3feea2f7a"' : 'data-target="#xs-components-links-module-NavSidebarModule-276e6120f9ebf5853436a4e3feea2f7a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NavSidebarModule-276e6120f9ebf5853436a4e3feea2f7a"' : 'id="xs-components-links-module-NavSidebarModule-276e6120f9ebf5853436a4e3feea2f7a"' }>
                                        <li class="link">
                                            <a href="components/NavSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavSidebarComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NavbarModule.html" data-type="entity-link">NavbarModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NavbarModule-08a2f45d2c79abbf98e386ededc4f823"' : 'data-target="#xs-components-links-module-NavbarModule-08a2f45d2c79abbf98e386ededc4f823"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NavbarModule-08a2f45d2c79abbf98e386ededc4f823"' : 'id="xs-components-links-module-NavbarModule-08a2f45d2c79abbf98e386ededc4f823"' }>
                                        <li class="link">
                                            <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PermissionInputModule.html" data-type="entity-link">PermissionInputModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionInputModule-9b45c8539a94eba37c9ec94ab37471c1"' : 'data-target="#xs-components-links-module-PermissionInputModule-9b45c8539a94eba37c9ec94ab37471c1"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionInputModule-9b45c8539a94eba37c9ec94ab37471c1"' : 'id="xs-components-links-module-PermissionInputModule-9b45c8539a94eba37c9ec94ab37471c1"' }>
                                        <li class="link">
                                            <a href="components/PermissionInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionInputComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PermissionModalModule.html" data-type="entity-link">PermissionModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionModalModule-20c96b1c4f3357588738a74ba44d696c"' : 'data-target="#xs-components-links-module-PermissionModalModule-20c96b1c4f3357588738a74ba44d696c"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionModalModule-20c96b1c4f3357588738a74ba44d696c"' : 'id="xs-components-links-module-PermissionModalModule-20c96b1c4f3357588738a74ba44d696c"' }>
                                        <li class="link">
                                            <a href="components/PermissionModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PermissionSelectModule.html" data-type="entity-link">PermissionSelectModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionSelectModule-c13dfa965646be05bd3ba71a4216a26a"' : 'data-target="#xs-components-links-module-PermissionSelectModule-c13dfa965646be05bd3ba71a4216a26a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionSelectModule-c13dfa965646be05bd3ba71a4216a26a"' : 'id="xs-components-links-module-PermissionSelectModule-c13dfa965646be05bd3ba71a4216a26a"' }>
                                        <li class="link">
                                            <a href="components/PermissionSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionSelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PermissionsGridModalModule.html" data-type="entity-link">PermissionsGridModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionsGridModalModule-49509a6e819d15ed0f814772721e494a"' : 'data-target="#xs-components-links-module-PermissionsGridModalModule-49509a6e819d15ed0f814772721e494a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionsGridModalModule-49509a6e819d15ed0f814772721e494a"' : 'id="xs-components-links-module-PermissionsGridModalModule-49509a6e819d15ed0f814772721e494a"' }>
                                        <li class="link">
                                            <a href="components/PermissionsGridModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsGridModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PermissionsGridModule.html" data-type="entity-link">PermissionsGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionsGridModule-0c007e2d266afc4758959153a40a45c6"' : 'data-target="#xs-components-links-module-PermissionsGridModule-0c007e2d266afc4758959153a40a45c6"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionsGridModule-0c007e2d266afc4758959153a40a45c6"' : 'id="xs-components-links-module-PermissionsGridModule-0c007e2d266afc4758959153a40a45c6"' }>
                                        <li class="link">
                                            <a href="components/PermissionsGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-PipesModule-75f4b589182b86d6de82e90822e44b12"' : 'data-target="#xs-pipes-links-module-PipesModule-75f4b589182b86d6de82e90822e44b12"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-PipesModule-75f4b589182b86d6de82e90822e44b12"' : 'id="xs-pipes-links-module-PipesModule-75f4b589182b86d6de82e90822e44b12"' }>
                                        <li class="link">
                                            <a href="pipes/CustomTranslatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomTranslatePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PermPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SafeHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/UserPermPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserPermPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ProfilePanelModule.html" data-type="entity-link">ProfilePanelModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProfilePanelModule-ce181d659bbca1fefb31025f733ff644"' : 'data-target="#xs-components-links-module-ProfilePanelModule-ce181d659bbca1fefb31025f733ff644"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProfilePanelModule-ce181d659bbca1fefb31025f733ff644"' : 'id="xs-components-links-module-ProfilePanelModule-ce181d659bbca1fefb31025f733ff644"' }>
                                        <li class="link">
                                            <a href="components/ProfilePanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePanelComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PromptFormModalModule.html" data-type="entity-link">PromptFormModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PromptFormModalModule-e391bec820259fbb824c0374ed4714da"' : 'data-target="#xs-components-links-module-PromptFormModalModule-e391bec820259fbb824c0374ed4714da"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PromptFormModalModule-e391bec820259fbb824c0374ed4714da"' : 'id="xs-components-links-module-PromptFormModalModule-e391bec820259fbb824c0374ed4714da"' }>
                                        <li class="link">
                                            <a href="components/PromptFormModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PromptFormModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ThemesModule.html" data-type="entity-link">ThemesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ThemesModule-4fde8e33aa9250f98e13ab0316412517"' : 'data-target="#xs-injectables-links-module-ThemesModule-4fde8e33aa9250f98e13ab0316412517"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ThemesModule-4fde8e33aa9250f98e13ab0316412517"' : 'id="xs-injectables-links-module-ThemesModule-4fde8e33aa9250f98e13ab0316412517"' }>
                                        <li class="link">
                                            <a href="injectables/ThemesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ThemesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UserGroupsGridModule.html" data-type="entity-link">UserGroupsGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserGroupsGridModule-73905f22fd15a688cbd0fab43ae00fdd"' : 'data-target="#xs-components-links-module-UserGroupsGridModule-73905f22fd15a688cbd0fab43ae00fdd"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserGroupsGridModule-73905f22fd15a688cbd0fab43ae00fdd"' : 'id="xs-components-links-module-UserGroupsGridModule-73905f22fd15a688cbd0fab43ae00fdd"' }>
                                        <li class="link">
                                            <a href="components/UserGroupsGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupsGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UserInputModule.html" data-type="entity-link">UserInputModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserInputModule-3d597f5451307a6b08625265744061f0"' : 'data-target="#xs-components-links-module-UserInputModule-3d597f5451307a6b08625265744061f0"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserInputModule-3d597f5451307a6b08625265744061f0"' : 'id="xs-components-links-module-UserInputModule-3d597f5451307a6b08625265744061f0"' }>
                                        <li class="link">
                                            <a href="components/UserInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInputComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UserModalModule.html" data-type="entity-link">UserModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserModalModule-4a6c390d702817423e6c3085e407d108"' : 'data-target="#xs-components-links-module-UserModalModule-4a6c390d702817423e6c3085e407d108"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserModalModule-4a6c390d702817423e6c3085e407d108"' : 'id="xs-components-links-module-UserModalModule-4a6c390d702817423e6c3085e407d108"' }>
                                        <li class="link">
                                            <a href="components/UserModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UserSelectModule.html" data-type="entity-link">UserSelectModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserSelectModule-ecd3dd51809711452f11a5672c0fbe14"' : 'data-target="#xs-components-links-module-UserSelectModule-ecd3dd51809711452f11a5672c0fbe14"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserSelectModule-ecd3dd51809711452f11a5672c0fbe14"' : 'id="xs-components-links-module-UserSelectModule-ecd3dd51809711452f11a5672c0fbe14"' }>
                                        <li class="link">
                                            <a href="components/UserSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserSelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UsersGridModalModule.html" data-type="entity-link">UsersGridModalModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersGridModalModule-2430bca9bef79f03213a9458b9a5c516"' : 'data-target="#xs-components-links-module-UsersGridModalModule-2430bca9bef79f03213a9458b9a5c516"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersGridModalModule-2430bca9bef79f03213a9458b9a5c516"' : 'id="xs-components-links-module-UsersGridModalModule-2430bca9bef79f03213a9458b9a5c516"' }>
                                        <li class="link">
                                            <a href="components/UsersGridModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersGridModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UsersGridModule.html" data-type="entity-link">UsersGridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersGridModule-2280c77fa3ccb99054ff30d9bd135998"' : 'data-target="#xs-components-links-module-UsersGridModule-2280c77fa3ccb99054ff30d9bd135998"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersGridModule-2280c77fa3ccb99054ff30d9bd135998"' : 'id="xs-components-links-module-UsersGridModule-2280c77fa3ccb99054ff30d9bd135998"' }>
                                        <li class="link">
                                            <a href="components/UsersGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersGridComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/AuthModalModel.html" data-type="entity-link">AuthModalModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/BaseEntityListComponent.html" data-type="entity-link">BaseEntityListComponent</a>
                    </li>
                    <li class="link">
                        <a href="classes/BaseEntityListModalComponent.html" data-type="entity-link">BaseEntityListModalComponent</a>
                    </li>
                    <li class="link">
                        <a href="classes/BasePromptComponent.html" data-type="entity-link">BasePromptComponent</a>
                    </li>
                    <li class="link">
                        <a href="classes/BasePromptFormModalComponent.html" data-type="entity-link">BasePromptFormModalComponent</a>
                    </li>
                    <li class="link">
                        <a href="classes/BasePromptModalComponent.html" data-type="entity-link">BasePromptModalComponent</a>
                    </li>
                    <li class="link">
                        <a href="classes/BasePromptPanelComponent.html" data-type="entity-link">BasePromptPanelComponent</a>
                    </li>
                    <li class="link">
                        <a href="classes/IBaseForm.html" data-type="entity-link">IBaseForm</a>
                    </li>
                    <li class="link">
                        <a href="classes/Theme.html" data-type="entity-link">Theme</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/MessageModalService.html" data-type="entity-link">MessageModalService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ThemesService.html" data-type="entity-link">ThemesService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/IAuthModalConfig.html" data-type="entity-link">IAuthModalConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IAuthModalOauthProvider.html" data-type="entity-link">IAuthModalOauthProvider</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IBaseEntityList.html" data-type="entity-link">IBaseEntityList</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IBaseEntityListModal.html" data-type="entity-link">IBaseEntityListModal</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IBaseEntityModalOptions.html" data-type="entity-link">IBaseEntityModalOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IBaseEntityModals.html" data-type="entity-link">IBaseEntityModals</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IEntityGridFilter.html" data-type="entity-link">IEntityGridFilter</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IThemesConfig.html" data-type="entity-link">IThemesConfig</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
