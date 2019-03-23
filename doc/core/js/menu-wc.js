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
                    <a href="index.html" data-type="index-link">rucken:core</a>
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
                                <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountModule-7b19744431c9b7778d62c23540f5865f"' : 'data-target="#xs-injectables-links-module-AccountModule-7b19744431c9b7778d62c23540f5865f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-7b19744431c9b7778d62c23540f5865f"' :
                                        'id="xs-injectables-links-module-AccountModule-7b19744431c9b7778d62c23540f5865f"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AccountService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModalModule.html" data-type="entity-link">AuthModalModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' : 'data-target="#xs-components-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' :
                                            'id="xs-components-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' }>
                                            <li class="link">
                                                <a href="components/AuthEmptyPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthEmptyPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' : 'data-target="#xs-injectables-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' :
                                        'id="xs-injectables-links-module-AuthModule-d09c7ce0901924aaf0669649608912bf"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TokenService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DirectivesModule.html" data-type="entity-link">DirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' : 'data-target="#xs-directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' :
                                        'id="xs-directives-links-module-DirectivesModule-5462fcae02099efa17f6162cb984a694"' }>
                                        <li class="link">
                                            <a href="directives/DisableControlDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DisableControlDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FocusedDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FocusedDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LangModule.html" data-type="entity-link">LangModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LangModule-a49a4c1a09f8824dfeae34ae11a5ad26"' : 'data-target="#xs-injectables-links-module-LangModule-a49a4c1a09f8824dfeae34ae11a5ad26"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LangModule-a49a4c1a09f8824dfeae34ae11a5ad26"' :
                                        'id="xs-injectables-links-module-LangModule-a49a4c1a09f8824dfeae34ae11a5ad26"' }>
                                        <li class="link">
                                            <a href="injectables/LangService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LangService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalsModule.html" data-type="entity-link">ModalsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"' : 'data-target="#xs-injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"' :
                                        'id="xs-injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"' }>
                                        <li class="link">
                                            <a href="injectables/ModalsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModalsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"' : 'data-target="#xs-pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"' :
                                            'id="xs-pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"' }>
                                            <li class="link">
                                                <a href="pipes/CustomTranslatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomTranslatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PermPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/UserPermPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserPermPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RuckenCoreModule.html" data-type="entity-link">RuckenCoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RuckenCoreModule-323e6ba5d833284ffc8ae7063be9a49a"' : 'data-target="#xs-injectables-links-module-RuckenCoreModule-323e6ba5d833284ffc8ae7063be9a49a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RuckenCoreModule-323e6ba5d833284ffc8ae7063be9a49a"' :
                                        'id="xs-injectables-links-module-RuckenCoreModule-323e6ba5d833284ffc8ae7063be9a49a"' }>
                                        <li class="link">
                                            <a href="injectables/ErrorsExtractor.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorsExtractor</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionsGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PermissionsGuard</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransferHttpCacheModule.html" data-type="entity-link">TransferHttpCacheModule</a>
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
                                <a href="classes/AuthModalComponent.html" data-type="entity-link">AuthModalComponent</a>
                            </li>
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
                                <a href="classes/ContentType.html" data-type="entity-link">ContentType</a>
                            </li>
                            <li class="link">
                                <a href="classes/EqualsToOtherProperty.html" data-type="entity-link">EqualsToOtherProperty</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/IBaseForm.html" data-type="entity-link">IBaseForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link">Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedirectUrlDto.html" data-type="entity-link">RedirectUrlDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserTokenDto.html" data-type="entity-link">UserTokenDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthModalService.html" data-type="entity-link">AuthModalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrowserStorage.html" data-type="entity-link">BrowserStorage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UniversalStorage.html" data-type="entity-link">UniversalStorage</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TransferHttpCacheInterceptor.html" data-type="entity-link">TransferHttpCacheInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/OauthGuard.html" data-type="entity-link">OauthGuard</a>
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
                                <a href="interfaces/IAccountConfig.html" data-type="entity-link">IAccountConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthConfig.html" data-type="entity-link">IAuthConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthModalConfig.html" data-type="entity-link">IAuthModalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthModalOauthProvider.html" data-type="entity-link">IAuthModalOauthProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthOauthProvider.html" data-type="entity-link">IAuthOauthProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseEntityGridFilter.html" data-type="entity-link">IBaseEntityGridFilter</a>
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
                                <a href="interfaces/IJwtConfig.html" data-type="entity-link">IJwtConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILangConfig.html" data-type="entity-link">ILangConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILanguagesItem.html" data-type="entity-link">ILanguagesItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IModalRef.html" data-type="entity-link">IModalRef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOauthConfig.html" data-type="entity-link">IOauthConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStorage.html" data-type="entity-link">IStorage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITransferHttpResponse.html" data-type="entity-link">ITransferHttpResponse</a>
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
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});