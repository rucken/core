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
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rucken:web</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
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
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ContentTypeInputModule.html" data-type="entity-link">ContentTypeInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentTypeInputModule-0dffe9e52e57d9c64e432952b97495d7"' : 'data-target="#xs-components-links-module-ContentTypeInputModule-0dffe9e52e57d9c64e432952b97495d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTypeInputModule-0dffe9e52e57d9c64e432952b97495d7"' :
                                            'id="xs-components-links-module-ContentTypeInputModule-0dffe9e52e57d9c64e432952b97495d7"' }>
                                            <li class="link">
                                                <a href="components/ContentTypeInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypeInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentTypeModalModule.html" data-type="entity-link">ContentTypeModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentTypeModalModule-82af205fc3f432b1fe5c316a3854ca80"' : 'data-target="#xs-components-links-module-ContentTypeModalModule-82af205fc3f432b1fe5c316a3854ca80"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTypeModalModule-82af205fc3f432b1fe5c316a3854ca80"' :
                                            'id="xs-components-links-module-ContentTypeModalModule-82af205fc3f432b1fe5c316a3854ca80"' }>
                                            <li class="link">
                                                <a href="components/ContentTypeModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypeModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentTypeSelectModule.html" data-type="entity-link">ContentTypeSelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentTypeSelectModule-86eaffeba70d4c1d9a884a6d6a666dac"' : 'data-target="#xs-components-links-module-ContentTypeSelectModule-86eaffeba70d4c1d9a884a6d6a666dac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTypeSelectModule-86eaffeba70d4c1d9a884a6d6a666dac"' :
                                            'id="xs-components-links-module-ContentTypeSelectModule-86eaffeba70d4c1d9a884a6d6a666dac"' }>
                                            <li class="link">
                                                <a href="components/ContentTypeSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypeSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentTypesGridModalModule.html" data-type="entity-link">ContentTypesGridModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentTypesGridModalModule-8edca2f4633bf5fc8b893fa15f4b23ae"' : 'data-target="#xs-components-links-module-ContentTypesGridModalModule-8edca2f4633bf5fc8b893fa15f4b23ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTypesGridModalModule-8edca2f4633bf5fc8b893fa15f4b23ae"' :
                                            'id="xs-components-links-module-ContentTypesGridModalModule-8edca2f4633bf5fc8b893fa15f4b23ae"' }>
                                            <li class="link">
                                                <a href="components/ContentTypesGridModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesGridModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentTypesGridModule.html" data-type="entity-link">ContentTypesGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentTypesGridModule-155e6f9dfd84c57a5f06413f93c73360"' : 'data-target="#xs-components-links-module-ContentTypesGridModule-155e6f9dfd84c57a5f06413f93c73360"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTypesGridModule-155e6f9dfd84c57a5f06413f93c73360"' :
                                            'id="xs-components-links-module-ContentTypesGridModule-155e6f9dfd84c57a5f06413f93c73360"' }>
                                            <li class="link">
                                                <a href="components/ContentTypesGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityGridModalModule.html" data-type="entity-link">EntityGridModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityGridModalModule-c593e79069a3d9335a8fdf3295d80a1f"' : 'data-target="#xs-components-links-module-EntityGridModalModule-c593e79069a3d9335a8fdf3295d80a1f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityGridModalModule-c593e79069a3d9335a8fdf3295d80a1f"' :
                                            'id="xs-components-links-module-EntityGridModalModule-c593e79069a3d9335a8fdf3295d80a1f"' }>
                                            <li class="link">
                                                <a href="components/EntityGridModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityGridModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityGridModule.html" data-type="entity-link">EntityGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityGridModule-7ba16e2ae4fb8b95110ae547067649b6"' : 'data-target="#xs-components-links-module-EntityGridModule-7ba16e2ae4fb8b95110ae547067649b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityGridModule-7ba16e2ae4fb8b95110ae547067649b6"' :
                                            'id="xs-components-links-module-EntityGridModule-7ba16e2ae4fb8b95110ae547067649b6"' }>
                                            <li class="link">
                                                <a href="components/EntityGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityInputModule.html" data-type="entity-link">EntityInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' : 'data-target="#xs-components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' :
                                            'id="xs-components-links-module-EntityInputModule-c610a3b72dd30b249391787072545c67"' }>
                                            <li class="link">
                                                <a href="components/EntityInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityModalModule.html" data-type="entity-link">EntityModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityModalModule-58f07be4f5af0b89ba2633aed14a9c61"' : 'data-target="#xs-components-links-module-EntityModalModule-58f07be4f5af0b89ba2633aed14a9c61"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityModalModule-58f07be4f5af0b89ba2633aed14a9c61"' :
                                            'id="xs-components-links-module-EntityModalModule-58f07be4f5af0b89ba2633aed14a9c61"' }>
                                            <li class="link">
                                                <a href="components/EntityModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntityModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntitySelectModule.html" data-type="entity-link">EntitySelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' : 'data-target="#xs-components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' :
                                            'id="xs-components-links-module-EntitySelectModule-d3cf8aef93bb606e894a3a9879c26b03"' }>
                                            <li class="link">
                                                <a href="components/EntitySelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntitySelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormGroupModule.html" data-type="entity-link">FormGroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' : 'data-target="#xs-components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' :
                                            'id="xs-components-links-module-FormGroupModule-aa27276ea094d7e73ebcbd8f1d830a25"' }>
                                            <li class="link">
                                                <a href="components/FormGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormGroupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupInputModule.html" data-type="entity-link">GroupInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupInputModule-5c322aa69dbe05373dfe65eefe2fda75"' : 'data-target="#xs-components-links-module-GroupInputModule-5c322aa69dbe05373dfe65eefe2fda75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupInputModule-5c322aa69dbe05373dfe65eefe2fda75"' :
                                            'id="xs-components-links-module-GroupInputModule-5c322aa69dbe05373dfe65eefe2fda75"' }>
                                            <li class="link">
                                                <a href="components/GroupInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupModalModule.html" data-type="entity-link">GroupModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupModalModule-d929b532fa22ced2fc19b7aa746c44fb"' : 'data-target="#xs-components-links-module-GroupModalModule-d929b532fa22ced2fc19b7aa746c44fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupModalModule-d929b532fa22ced2fc19b7aa746c44fb"' :
                                            'id="xs-components-links-module-GroupModalModule-d929b532fa22ced2fc19b7aa746c44fb"' }>
                                            <li class="link">
                                                <a href="components/GroupModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupPermissionsGridModule.html" data-type="entity-link">GroupPermissionsGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupPermissionsGridModule-cb78c9706774e747d082353920f28800"' : 'data-target="#xs-components-links-module-GroupPermissionsGridModule-cb78c9706774e747d082353920f28800"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupPermissionsGridModule-cb78c9706774e747d082353920f28800"' :
                                            'id="xs-components-links-module-GroupPermissionsGridModule-cb78c9706774e747d082353920f28800"' }>
                                            <li class="link">
                                                <a href="components/GroupPermissionsGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupPermissionsGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupSelectModule.html" data-type="entity-link">GroupSelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupSelectModule-bdf618c1b9959c1be55870d8041995f3"' : 'data-target="#xs-components-links-module-GroupSelectModule-bdf618c1b9959c1be55870d8041995f3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupSelectModule-bdf618c1b9959c1be55870d8041995f3"' :
                                            'id="xs-components-links-module-GroupSelectModule-bdf618c1b9959c1be55870d8041995f3"' }>
                                            <li class="link">
                                                <a href="components/GroupSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsGridModalModule.html" data-type="entity-link">GroupsGridModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupsGridModalModule-dbafaaf4c9442495e6ec847ba7d49246"' : 'data-target="#xs-components-links-module-GroupsGridModalModule-dbafaaf4c9442495e6ec847ba7d49246"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupsGridModalModule-dbafaaf4c9442495e6ec847ba7d49246"' :
                                            'id="xs-components-links-module-GroupsGridModalModule-dbafaaf4c9442495e6ec847ba7d49246"' }>
                                            <li class="link">
                                                <a href="components/GroupsGridModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsGridModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsGridModule.html" data-type="entity-link">GroupsGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupsGridModule-d607edd42a501eb1fcc2e3ffb8a926b6"' : 'data-target="#xs-components-links-module-GroupsGridModule-d607edd42a501eb1fcc2e3ffb8a926b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupsGridModule-d607edd42a501eb1fcc2e3ffb8a926b6"' :
                                            'id="xs-components-links-module-GroupsGridModule-d607edd42a501eb1fcc2e3ffb8a926b6"' }>
                                            <li class="link">
                                                <a href="components/GroupsGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavbarModule.html" data-type="entity-link">NavbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavbarModule-d251e7daae2675f12d88796e87d89327"' : 'data-target="#xs-components-links-module-NavbarModule-d251e7daae2675f12d88796e87d89327"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavbarModule-d251e7daae2675f12d88796e87d89327"' :
                                            'id="xs-components-links-module-NavbarModule-d251e7daae2675f12d88796e87d89327"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavSidebarModule.html" data-type="entity-link">NavSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavSidebarModule-97ed57301f5795c9f0e201e1b9207942"' : 'data-target="#xs-components-links-module-NavSidebarModule-97ed57301f5795c9f0e201e1b9207942"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavSidebarModule-97ed57301f5795c9f0e201e1b9207942"' :
                                            'id="xs-components-links-module-NavSidebarModule-97ed57301f5795c9f0e201e1b9207942"' }>
                                            <li class="link">
                                                <a href="components/NavSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionInputModule.html" data-type="entity-link">PermissionInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionInputModule-5a37747b8458730a5c541bb646f50f62"' : 'data-target="#xs-components-links-module-PermissionInputModule-5a37747b8458730a5c541bb646f50f62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionInputModule-5a37747b8458730a5c541bb646f50f62"' :
                                            'id="xs-components-links-module-PermissionInputModule-5a37747b8458730a5c541bb646f50f62"' }>
                                            <li class="link">
                                                <a href="components/PermissionInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionModalModule.html" data-type="entity-link">PermissionModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionModalModule-8cb97d452163cee4c912d6eb1d0cb776"' : 'data-target="#xs-components-links-module-PermissionModalModule-8cb97d452163cee4c912d6eb1d0cb776"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionModalModule-8cb97d452163cee4c912d6eb1d0cb776"' :
                                            'id="xs-components-links-module-PermissionModalModule-8cb97d452163cee4c912d6eb1d0cb776"' }>
                                            <li class="link">
                                                <a href="components/PermissionModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionSelectModule.html" data-type="entity-link">PermissionSelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionSelectModule-24170f41cd20156939d439942caf321f"' : 'data-target="#xs-components-links-module-PermissionSelectModule-24170f41cd20156939d439942caf321f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionSelectModule-24170f41cd20156939d439942caf321f"' :
                                            'id="xs-components-links-module-PermissionSelectModule-24170f41cd20156939d439942caf321f"' }>
                                            <li class="link">
                                                <a href="components/PermissionSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsGridModalModule.html" data-type="entity-link">PermissionsGridModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionsGridModalModule-cb0b56dace937dcc2f77dcee443aebe2"' : 'data-target="#xs-components-links-module-PermissionsGridModalModule-cb0b56dace937dcc2f77dcee443aebe2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionsGridModalModule-cb0b56dace937dcc2f77dcee443aebe2"' :
                                            'id="xs-components-links-module-PermissionsGridModalModule-cb0b56dace937dcc2f77dcee443aebe2"' }>
                                            <li class="link">
                                                <a href="components/PermissionsGridModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsGridModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsGridModule.html" data-type="entity-link">PermissionsGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionsGridModule-3e58e0f5939d0c25f416e485e5cb3f9e"' : 'data-target="#xs-components-links-module-PermissionsGridModule-3e58e0f5939d0c25f416e485e5cb3f9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionsGridModule-3e58e0f5939d0c25f416e485e5cb3f9e"' :
                                            'id="xs-components-links-module-PermissionsGridModule-3e58e0f5939d0c25f416e485e5cb3f9e"' }>
                                            <li class="link">
                                                <a href="components/PermissionsGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePanelModule.html" data-type="entity-link">ProfilePanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfilePanelModule-d944b0466ae64b5d2a2873883ac0ca57"' : 'data-target="#xs-components-links-module-ProfilePanelModule-d944b0466ae64b5d2a2873883ac0ca57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePanelModule-d944b0466ae64b5d2a2873883ac0ca57"' :
                                            'id="xs-components-links-module-ProfilePanelModule-d944b0466ae64b5d2a2873883ac0ca57"' }>
                                            <li class="link">
                                                <a href="components/ProfilePanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PromptFormModalModule.html" data-type="entity-link">PromptFormModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PromptFormModalModule-aab7c435002f000fe85231c0dcd40c11"' : 'data-target="#xs-components-links-module-PromptFormModalModule-aab7c435002f000fe85231c0dcd40c11"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PromptFormModalModule-aab7c435002f000fe85231c0dcd40c11"' :
                                            'id="xs-components-links-module-PromptFormModalModule-aab7c435002f000fe85231c0dcd40c11"' }>
                                            <li class="link">
                                                <a href="components/PromptFormModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PromptFormModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThemesModule.html" data-type="entity-link">ThemesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ThemesModule-e72f567b9400230106d502966547e5e8"' : 'data-target="#xs-injectables-links-module-ThemesModule-e72f567b9400230106d502966547e5e8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ThemesModule-e72f567b9400230106d502966547e5e8"' :
                                        'id="xs-injectables-links-module-ThemesModule-e72f567b9400230106d502966547e5e8"' }>
                                        <li class="link">
                                            <a href="injectables/ThemesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThemesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserGroupsGridModule.html" data-type="entity-link">UserGroupsGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserGroupsGridModule-c0feda5f303605e25625242a27100a9d"' : 'data-target="#xs-components-links-module-UserGroupsGridModule-c0feda5f303605e25625242a27100a9d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserGroupsGridModule-c0feda5f303605e25625242a27100a9d"' :
                                            'id="xs-components-links-module-UserGroupsGridModule-c0feda5f303605e25625242a27100a9d"' }>
                                            <li class="link">
                                                <a href="components/UserGroupsGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupsGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserInputModule.html" data-type="entity-link">UserInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserInputModule-e4897355ff7be45aa84992aab7cff5cd"' : 'data-target="#xs-components-links-module-UserInputModule-e4897355ff7be45aa84992aab7cff5cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserInputModule-e4897355ff7be45aa84992aab7cff5cd"' :
                                            'id="xs-components-links-module-UserInputModule-e4897355ff7be45aa84992aab7cff5cd"' }>
                                            <li class="link">
                                                <a href="components/UserInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModalModule.html" data-type="entity-link">UserModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModalModule-8c30611112cb11ffa08bd1cc9eebdd0d"' : 'data-target="#xs-components-links-module-UserModalModule-8c30611112cb11ffa08bd1cc9eebdd0d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModalModule-8c30611112cb11ffa08bd1cc9eebdd0d"' :
                                            'id="xs-components-links-module-UserModalModule-8c30611112cb11ffa08bd1cc9eebdd0d"' }>
                                            <li class="link">
                                                <a href="components/UserModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserSelectModule.html" data-type="entity-link">UserSelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserSelectModule-9372bb486ec8d7251c9992362948c944"' : 'data-target="#xs-components-links-module-UserSelectModule-9372bb486ec8d7251c9992362948c944"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserSelectModule-9372bb486ec8d7251c9992362948c944"' :
                                            'id="xs-components-links-module-UserSelectModule-9372bb486ec8d7251c9992362948c944"' }>
                                            <li class="link">
                                                <a href="components/UserSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersGridModalModule.html" data-type="entity-link">UsersGridModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersGridModalModule-bf01edb09c1c3eb0673dfc899fa6cb9c"' : 'data-target="#xs-components-links-module-UsersGridModalModule-bf01edb09c1c3eb0673dfc899fa6cb9c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersGridModalModule-bf01edb09c1c3eb0673dfc899fa6cb9c"' :
                                            'id="xs-components-links-module-UsersGridModalModule-bf01edb09c1c3eb0673dfc899fa6cb9c"' }>
                                            <li class="link">
                                                <a href="components/UsersGridModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersGridModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersGridModule.html" data-type="entity-link">UsersGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersGridModule-51fd6b82695c063382bee649d97224df"' : 'data-target="#xs-components-links-module-UsersGridModule-51fd6b82695c063382bee649d97224df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersGridModule-51fd6b82695c063382bee649d97224df"' :
                                            'id="xs-components-links-module-UsersGridModule-51fd6b82695c063382bee649d97224df"' }>
                                            <li class="link">
                                                <a href="components/UsersGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebAuthModalModule.html" data-type="entity-link">WebAuthModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' : 'data-target="#xs-components-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' :
                                            'id="xs-components-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' }>
                                            <li class="link">
                                                <a href="components/WebAuthModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebAuthModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' : 'data-target="#xs-injectables-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' :
                                        'id="xs-injectables-links-module-WebAuthModalModule-1e547aac00181b2edfb1273231111506"' }>
                                        <li class="link">
                                            <a href="injectables/WebAuthModalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WebAuthModalService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebModalsModule.html" data-type="entity-link">WebModalsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' : 'data-target="#xs-components-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' :
                                            'id="xs-components-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' }>
                                            <li class="link">
                                                <a href="components/MessageModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' : 'data-target="#xs-injectables-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' :
                                        'id="xs-injectables-links-module-WebModalsModule-391c5271ca0ec24e256d71f6af94f857"' }>
                                        <li class="link">
                                            <a href="injectables/WebModalsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WebModalsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Theme.html" data-type="entity-link">Theme</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IThemesConfig.html" data-type="entity-link">IThemesConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});