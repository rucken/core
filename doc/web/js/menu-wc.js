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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AuthModalModule-aae6f864962501a326b0ab1b91a90c4d"' : 'data-target="#xs-components-links-module-AuthModalModule-aae6f864962501a326b0ab1b91a90c4d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AuthModalModule-aae6f864962501a326b0ab1b91a90c4d"' : 'id="xs-components-links-module-AuthModalModule-aae6f864962501a326b0ab1b91a90c4d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypeInputModule-b5124302fbe69df68852a7af332fd3e2"' : 'data-target="#xs-components-links-module-ContentTypeInputModule-b5124302fbe69df68852a7af332fd3e2"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypeInputModule-b5124302fbe69df68852a7af332fd3e2"' : 'id="xs-components-links-module-ContentTypeInputModule-b5124302fbe69df68852a7af332fd3e2"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypeModalModule-6701ad58578bbe4532586d1c5b2a2301"' : 'data-target="#xs-components-links-module-ContentTypeModalModule-6701ad58578bbe4532586d1c5b2a2301"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypeModalModule-6701ad58578bbe4532586d1c5b2a2301"' : 'id="xs-components-links-module-ContentTypeModalModule-6701ad58578bbe4532586d1c5b2a2301"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypeSelectModule-2ccf90ab5efd560121812c48529f8734"' : 'data-target="#xs-components-links-module-ContentTypeSelectModule-2ccf90ab5efd560121812c48529f8734"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypeSelectModule-2ccf90ab5efd560121812c48529f8734"' : 'id="xs-components-links-module-ContentTypeSelectModule-2ccf90ab5efd560121812c48529f8734"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypesGridModalModule-1dbcad8a4012c3066f250bc416a8a2f9"' : 'data-target="#xs-components-links-module-ContentTypesGridModalModule-1dbcad8a4012c3066f250bc416a8a2f9"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypesGridModalModule-1dbcad8a4012c3066f250bc416a8a2f9"' : 'id="xs-components-links-module-ContentTypesGridModalModule-1dbcad8a4012c3066f250bc416a8a2f9"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypesGridModule-79541c8251c97c6c27f37c1879eaf48a"' : 'data-target="#xs-components-links-module-ContentTypesGridModule-79541c8251c97c6c27f37c1879eaf48a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypesGridModule-79541c8251c97c6c27f37c1879eaf48a"' : 'id="xs-components-links-module-ContentTypesGridModule-79541c8251c97c6c27f37c1879eaf48a"' }>
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
                                    ${ isNormalMode ? 'data-target="#directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' : 'data-target="#xs-directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' : 'id="xs-directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityGridModalModule-1c51d48dc6cf50176968e194597178ff"' : 'data-target="#xs-components-links-module-EntityGridModalModule-1c51d48dc6cf50176968e194597178ff"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityGridModalModule-1c51d48dc6cf50176968e194597178ff"' : 'id="xs-components-links-module-EntityGridModalModule-1c51d48dc6cf50176968e194597178ff"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityGridModule-6804311da6c09c4e7703bd1e1ab5487d"' : 'data-target="#xs-components-links-module-EntityGridModule-6804311da6c09c4e7703bd1e1ab5487d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityGridModule-6804311da6c09c4e7703bd1e1ab5487d"' : 'id="xs-components-links-module-EntityGridModule-6804311da6c09c4e7703bd1e1ab5487d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' : 'data-target="#xs-components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' : 'id="xs-components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntityModalModule-8b2d45c2d7e19f1476676dccb5fc377c"' : 'data-target="#xs-components-links-module-EntityModalModule-8b2d45c2d7e19f1476676dccb5fc377c"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntityModalModule-8b2d45c2d7e19f1476676dccb5fc377c"' : 'id="xs-components-links-module-EntityModalModule-8b2d45c2d7e19f1476676dccb5fc377c"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' : 'data-target="#xs-components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' : 'id="xs-components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' : 'data-target="#xs-components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' : 'id="xs-components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupInputModule-b75f3f9e26539d0107ee149e038812fc"' : 'data-target="#xs-components-links-module-GroupInputModule-b75f3f9e26539d0107ee149e038812fc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupInputModule-b75f3f9e26539d0107ee149e038812fc"' : 'id="xs-components-links-module-GroupInputModule-b75f3f9e26539d0107ee149e038812fc"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupModalModule-61be8356567d85b75328f2a5e4664761"' : 'data-target="#xs-components-links-module-GroupModalModule-61be8356567d85b75328f2a5e4664761"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupModalModule-61be8356567d85b75328f2a5e4664761"' : 'id="xs-components-links-module-GroupModalModule-61be8356567d85b75328f2a5e4664761"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupPermissionsGridModule-be3040035b35c0e0a34388b254aaec24"' : 'data-target="#xs-components-links-module-GroupPermissionsGridModule-be3040035b35c0e0a34388b254aaec24"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupPermissionsGridModule-be3040035b35c0e0a34388b254aaec24"' : 'id="xs-components-links-module-GroupPermissionsGridModule-be3040035b35c0e0a34388b254aaec24"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupSelectModule-c99b131b807422ec92a44f594ff19e35"' : 'data-target="#xs-components-links-module-GroupSelectModule-c99b131b807422ec92a44f594ff19e35"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupSelectModule-c99b131b807422ec92a44f594ff19e35"' : 'id="xs-components-links-module-GroupSelectModule-c99b131b807422ec92a44f594ff19e35"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupsGridModalModule-26e52bdc727fc56662570ad7dfeaceb1"' : 'data-target="#xs-components-links-module-GroupsGridModalModule-26e52bdc727fc56662570ad7dfeaceb1"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupsGridModalModule-26e52bdc727fc56662570ad7dfeaceb1"' : 'id="xs-components-links-module-GroupsGridModalModule-26e52bdc727fc56662570ad7dfeaceb1"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupsGridModule-4582980fb35b7448516275f096199411"' : 'data-target="#xs-components-links-module-GroupsGridModule-4582980fb35b7448516275f096199411"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupsGridModule-4582980fb35b7448516275f096199411"' : 'id="xs-components-links-module-GroupsGridModule-4582980fb35b7448516275f096199411"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' : 'data-target="#xs-components-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' : 'id="xs-components-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' }>
                                        <li class="link">
                                            <a href="components/MessageModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageModalComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' : 'data-target="#xs-injectables-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' : 'id="xs-injectables-links-module-MessageModalModule-bda97199ce86334279b3f74a79771691"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-NavSidebarModule-84c62edbc3d7342701a4d6a66bda2957"' : 'data-target="#xs-components-links-module-NavSidebarModule-84c62edbc3d7342701a4d6a66bda2957"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NavSidebarModule-84c62edbc3d7342701a4d6a66bda2957"' : 'id="xs-components-links-module-NavSidebarModule-84c62edbc3d7342701a4d6a66bda2957"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-NavbarModule-e9105fa03c9f582fa9b230587092480b"' : 'data-target="#xs-components-links-module-NavbarModule-e9105fa03c9f582fa9b230587092480b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NavbarModule-e9105fa03c9f582fa9b230587092480b"' : 'id="xs-components-links-module-NavbarModule-e9105fa03c9f582fa9b230587092480b"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionInputModule-259a3513b3ab60cbbeb3a3d6b64c1e02"' : 'data-target="#xs-components-links-module-PermissionInputModule-259a3513b3ab60cbbeb3a3d6b64c1e02"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionInputModule-259a3513b3ab60cbbeb3a3d6b64c1e02"' : 'id="xs-components-links-module-PermissionInputModule-259a3513b3ab60cbbeb3a3d6b64c1e02"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionModalModule-ff14de171df93e91a2a680348fe8951f"' : 'data-target="#xs-components-links-module-PermissionModalModule-ff14de171df93e91a2a680348fe8951f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionModalModule-ff14de171df93e91a2a680348fe8951f"' : 'id="xs-components-links-module-PermissionModalModule-ff14de171df93e91a2a680348fe8951f"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionSelectModule-91dd42ee1069b8c6f3434dca0586d940"' : 'data-target="#xs-components-links-module-PermissionSelectModule-91dd42ee1069b8c6f3434dca0586d940"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionSelectModule-91dd42ee1069b8c6f3434dca0586d940"' : 'id="xs-components-links-module-PermissionSelectModule-91dd42ee1069b8c6f3434dca0586d940"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionsGridModalModule-b2c36797d383f2b3c9cba4811e7df61d"' : 'data-target="#xs-components-links-module-PermissionsGridModalModule-b2c36797d383f2b3c9cba4811e7df61d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionsGridModalModule-b2c36797d383f2b3c9cba4811e7df61d"' : 'id="xs-components-links-module-PermissionsGridModalModule-b2c36797d383f2b3c9cba4811e7df61d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionsGridModule-9185136d490b07a7cd2015d85c1746e8"' : 'data-target="#xs-components-links-module-PermissionsGridModule-9185136d490b07a7cd2015d85c1746e8"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionsGridModule-9185136d490b07a7cd2015d85c1746e8"' : 'id="xs-components-links-module-PermissionsGridModule-9185136d490b07a7cd2015d85c1746e8"' }>
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
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-PipesModule-d36e56824f3e7ac4890f27b5a2b574c1"' : 'data-target="#xs-pipes-links-module-PipesModule-d36e56824f3e7ac4890f27b5a2b574c1"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-PipesModule-d36e56824f3e7ac4890f27b5a2b574c1"' : 'id="xs-pipes-links-module-PipesModule-d36e56824f3e7ac4890f27b5a2b574c1"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProfilePanelModule-717833355100e2ae9635ba8f93646860"' : 'data-target="#xs-components-links-module-ProfilePanelModule-717833355100e2ae9635ba8f93646860"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProfilePanelModule-717833355100e2ae9635ba8f93646860"' : 'id="xs-components-links-module-ProfilePanelModule-717833355100e2ae9635ba8f93646860"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PromptFormModalModule-53375bb14708ef2f506247a98573d10d"' : 'data-target="#xs-components-links-module-PromptFormModalModule-53375bb14708ef2f506247a98573d10d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PromptFormModalModule-53375bb14708ef2f506247a98573d10d"' : 'id="xs-components-links-module-PromptFormModalModule-53375bb14708ef2f506247a98573d10d"' }>
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
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ThemesModule-2e1aa50b9372ce649b83ed4b9eb1c4ab"' : 'data-target="#xs-injectables-links-module-ThemesModule-2e1aa50b9372ce649b83ed4b9eb1c4ab"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ThemesModule-2e1aa50b9372ce649b83ed4b9eb1c4ab"' : 'id="xs-injectables-links-module-ThemesModule-2e1aa50b9372ce649b83ed4b9eb1c4ab"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserGroupsGridModule-62ee35f4b0694655fc41c9ff7c47706d"' : 'data-target="#xs-components-links-module-UserGroupsGridModule-62ee35f4b0694655fc41c9ff7c47706d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserGroupsGridModule-62ee35f4b0694655fc41c9ff7c47706d"' : 'id="xs-components-links-module-UserGroupsGridModule-62ee35f4b0694655fc41c9ff7c47706d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserInputModule-106c3c57522133755e6db5a14f21bd70"' : 'data-target="#xs-components-links-module-UserInputModule-106c3c57522133755e6db5a14f21bd70"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserInputModule-106c3c57522133755e6db5a14f21bd70"' : 'id="xs-components-links-module-UserInputModule-106c3c57522133755e6db5a14f21bd70"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserModalModule-abf7e2d5f7b17f0e635653a185ac14bf"' : 'data-target="#xs-components-links-module-UserModalModule-abf7e2d5f7b17f0e635653a185ac14bf"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserModalModule-abf7e2d5f7b17f0e635653a185ac14bf"' : 'id="xs-components-links-module-UserModalModule-abf7e2d5f7b17f0e635653a185ac14bf"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserSelectModule-2ed4aac29efbe9c9f06403cab78b273d"' : 'data-target="#xs-components-links-module-UserSelectModule-2ed4aac29efbe9c9f06403cab78b273d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserSelectModule-2ed4aac29efbe9c9f06403cab78b273d"' : 'id="xs-components-links-module-UserSelectModule-2ed4aac29efbe9c9f06403cab78b273d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersGridModalModule-02b817acabbbce541c6a44b99909ba5d"' : 'data-target="#xs-components-links-module-UsersGridModalModule-02b817acabbbce541c6a44b99909ba5d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersGridModalModule-02b817acabbbce541c6a44b99909ba5d"' : 'id="xs-components-links-module-UsersGridModalModule-02b817acabbbce541c6a44b99909ba5d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersGridModule-241fed5d5e6e65fb617ad11e1fd674a4"' : 'data-target="#xs-components-links-module-UsersGridModule-241fed5d5e6e65fb617ad11e1fd674a4"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersGridModule-241fed5d5e6e65fb617ad11e1fd674a4"' : 'id="xs-components-links-module-UsersGridModule-241fed5d5e6e65fb617ad11e1fd674a4"' }>
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
