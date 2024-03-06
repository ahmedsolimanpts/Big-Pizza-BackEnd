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
                    <a href="index.html" data-type="index-link">big-pizza-back-end documentation</a>
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
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' :
                                            'id="xs-controllers-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' :
                                        'id="xs-injectables-links-module-AuthModule-19b5e0aa623608a658fe19c550b4fd8e8bc3457af79025d86d666111d21acf921dfc3add657f690a805f2d077535b7722e2a193949a54573f39042df3e9983bf"' }>
                                        <li class="link">
                                            <a href="injectables/ATStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ATStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BillingModule.html" data-type="entity-link" >BillingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' : 'data-bs-target="#xs-controllers-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' :
                                            'id="xs-controllers-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' }>
                                            <li class="link">
                                                <a href="controllers/BillingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' : 'data-bs-target="#xs-injectables-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' :
                                        'id="xs-injectables-links-module-BillingModule-10f13587351a8df9d6a5299fd78424fd0b0e02d9de7b698ed86f59323aefa7a57a6d7a08e358375056da6f0e744a7466423b050094464064cae490e1201b8a42"' }>
                                        <li class="link">
                                            <a href="injectables/BillingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BranchModule.html" data-type="entity-link" >BranchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' : 'data-bs-target="#xs-controllers-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' :
                                            'id="xs-controllers-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' }>
                                            <li class="link">
                                                <a href="controllers/BranchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' : 'data-bs-target="#xs-injectables-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' :
                                        'id="xs-injectables-links-module-BranchModule-6e654871ab08acee58ad12940afcb8111754c6485f2c195423fa47e256758e10b970d91640d388a708df1558ae8d938020ad07b60dd650ab65060af269ac44a6"' }>
                                        <li class="link">
                                            <a href="injectables/BranchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartModule.html" data-type="entity-link" >CartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' : 'data-bs-target="#xs-controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' :
                                            'id="xs-controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                            <li class="link">
                                                <a href="controllers/CartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' : 'data-bs-target="#xs-injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' :
                                        'id="xs-injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                        <li class="link">
                                            <a href="injectables/CartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CouponModule.html" data-type="entity-link" >CouponModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' : 'data-bs-target="#xs-controllers-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' :
                                            'id="xs-controllers-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' }>
                                            <li class="link">
                                                <a href="controllers/CouponController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CouponController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' : 'data-bs-target="#xs-injectables-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' :
                                        'id="xs-injectables-links-module-CouponModule-53df937c4d11f9a556fb2e4f5b153e3b8b207131c7a667015f857fabb6dcb7321fed2c8d2c0c0a9beec6b63a93be764de4b33c787a6a747951c4681b02ef6e69"' }>
                                        <li class="link">
                                            <a href="injectables/CouponService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CouponService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' : 'data-bs-target="#xs-controllers-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' :
                                            'id="xs-controllers-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' }>
                                            <li class="link">
                                                <a href="controllers/CustomerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' : 'data-bs-target="#xs-injectables-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' :
                                        'id="xs-injectables-links-module-CustomerModule-0a41387d21cc7173f1371d64ed22d00dc21224445cbdc143a50910234dda024ca6b4d5809c1a59fc1738223f8154cd99cce84e75103a12894439383e3f101995"' }>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryModule.html" data-type="entity-link" >DeliveryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' : 'data-bs-target="#xs-controllers-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' :
                                            'id="xs-controllers-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' : 'data-bs-target="#xs-injectables-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' :
                                        'id="xs-injectables-links-module-DeliveryModule-5a3fb264989b2ca233c9b35da3da2f1dda40ba25eb8cfba2e7d5eebb0c043ad6849d82e1fda5879b30d7ec01a6fce39992c30fd5fb79ce4b33da0b334dc11511"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' :
                                            'id="xs-controllers-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' :
                                        'id="xs-injectables-links-module-EmployeeModule-5f757a3450244f843fc2f23401471129e0830d4ce7b992d282c2fd816b885bc1c647efd1315f14221537c0cb86095075e15c480aaa9980f998b3911b73fb4f56"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LocationModule.html" data-type="entity-link" >LocationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' : 'data-bs-target="#xs-controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' :
                                            'id="xs-controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                            <li class="link">
                                                <a href="controllers/LocationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' : 'data-bs-target="#xs-injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' :
                                        'id="xs-injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                        <li class="link">
                                            <a href="injectables/LocationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' : 'data-bs-target="#xs-controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' :
                                            'id="xs-controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                            <li class="link">
                                                <a href="controllers/MaterialController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' : 'data-bs-target="#xs-injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' :
                                        'id="xs-injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                        <li class="link">
                                            <a href="injectables/MaterialService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OffersModule.html" data-type="entity-link" >OffersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' : 'data-bs-target="#xs-controllers-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' :
                                            'id="xs-controllers-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' }>
                                            <li class="link">
                                                <a href="controllers/OffersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OffersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' : 'data-bs-target="#xs-injectables-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' :
                                        'id="xs-injectables-links-module-OffersModule-a7ec042340b3f044938e2b828abb5c2f023972fae853a2e7591310620517d6b90d6fcb9f21ff674a3208d8ddaa5356d623abddd0a1f3fd340ab340dc634cd7f6"' }>
                                        <li class="link">
                                            <a href="injectables/OffersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OffersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' : 'data-bs-target="#xs-controllers-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' :
                                            'id="xs-controllers-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' : 'data-bs-target="#xs-injectables-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' :
                                        'id="xs-injectables-links-module-OrderModule-c0daaf0c9e1de2c85e27c90ae6e3709c14a818ca9f19c93632ec14da000c03d02dad289cf909a8dcfed3eabe68f88d386c59468ecab3360823464afc95a32669"' }>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' :
                                            'id="xs-controllers-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' :
                                        'id="xs-injectables-links-module-PaymentModule-1f102ccd666d8a0073af522b80bf08fec1e29ab698fb82bd862565f3e5446dcc4c485e11f1c7253da0dfd6b5a504d62cec8d11d9079e6656c4f4f1f0ff52d2f6"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' :
                                            'id="xs-controllers-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' :
                                        'id="xs-injectables-links-module-ProductModule-40dc848ccc3e64748adb16694f766549e288de622d6a37a6ce8c0a7c7ebdfa9956a45c852bb2cb6982e49f3eb40cb1322f3be975197de1390ba7be62eb1c83b7"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StockModule.html" data-type="entity-link" >StockModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' : 'data-bs-target="#xs-controllers-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' :
                                            'id="xs-controllers-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' }>
                                            <li class="link">
                                                <a href="controllers/StockController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockItemController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockItemLogsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemLogsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockTransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockTransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' : 'data-bs-target="#xs-injectables-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' :
                                        'id="xs-injectables-links-module-StockModule-240c73b61ba9c5096c86f658ff34c4eef2555ad7c1a595ccf923637c9c2e5411ca8ebe8249cd5ae92d65a7a94da4c0c171f99e02e29fa97b4b60ac7ed44bbaad"' }>
                                        <li class="link">
                                            <a href="injectables/StockItemLogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemLogsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockItemService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockTransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockTransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SupplierModule.html" data-type="entity-link" >SupplierModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' : 'data-bs-target="#xs-controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' :
                                            'id="xs-controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                            <li class="link">
                                                <a href="controllers/SupplierController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupplierController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' : 'data-bs-target="#xs-injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' :
                                        'id="xs-injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                        <li class="link">
                                            <a href="injectables/SupplierService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupplierService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' : 'data-bs-target="#xs-controllers-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' :
                                            'id="xs-controllers-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' : 'data-bs-target="#xs-injectables-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' :
                                        'id="xs-injectables-links-module-TicketModule-2bd4992d4cced141916edcf009f9e6d982a6cb5d61cd1a4fa0109755d7ec42c5ab567a8d87bf202520639059da6b5a06dc0434c9d1eece8bb65f336aa3c956ea"' }>
                                        <li class="link">
                                            <a href="injectables/TicketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' :
                                            'id="xs-controllers-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' :
                                        'id="xs-injectables-links-module-UsersModule-41b66c8e3680d2ddef0af8705507206b023834417752b6718070feee4413fcb821db348ae28a39ed5dcc88c55bd7a75dba3147af30849394c0307fcdecfe97d9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddTicketUpdateDto.html" data-type="entity-link" >AddTicketUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssignRoleDto.html" data-type="entity-link" >AssignRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Attendence.html" data-type="entity-link" >Attendence</a>
                            </li>
                            <li class="link">
                                <a href="classes/Billing.html" data-type="entity-link" >Billing</a>
                            </li>
                            <li class="link">
                                <a href="classes/Branch.html" data-type="entity-link" >Branch</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cart.html" data-type="entity-link" >Cart</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeUserStatusDTO.html" data-type="entity-link" >ChangeUserStatusDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Coordinates.html" data-type="entity-link" >Coordinates</a>
                            </li>
                            <li class="link">
                                <a href="classes/Coupon.html" data-type="entity-link" >Coupon</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminUserDto.html" data-type="entity-link" >CreateAdminUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAttendActionDTO.html" data-type="entity-link" >CreateAttendActionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBaseOrderDto.html" data-type="entity-link" >CreateBaseOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBillingDto.html" data-type="entity-link" >CreateBillingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBranchDto.html" data-type="entity-link" >CreateBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCartDto.html" data-type="entity-link" >CreateCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCordinatesDto.html" data-type="entity-link" >CreateCordinatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCouponDto.html" data-type="entity-link" >CreateCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCustomerDto.html" data-type="entity-link" >CreateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDelivereyOrderDto.html" data-type="entity-link" >CreateDelivereyOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeliveryDto.html" data-type="entity-link" >CreateDeliveryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDineInOrderDto.html" data-type="entity-link" >CreateDineInOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeDto.html" data-type="entity-link" >CreateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeePDRDTO.html" data-type="entity-link" >CreateEmployeePDRDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLocationDto.html" data-type="entity-link" >CreateLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMaterialDto.html" data-type="entity-link" >CreateMaterialDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferDto.html" data-type="entity-link" >CreateOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderItemsDto.html" data-type="entity-link" >CreateOrderItemsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link" >CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockDto.html" data-type="entity-link" >CreateStockDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockItemDto.html" data-type="entity-link" >CreateStockItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockItemLogsDto.html" data-type="entity-link" >CreateStockItemLogsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSuperUserDto.html" data-type="entity-link" >CreateSuperUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSupplierDto.html" data-type="entity-link" >CreateSupplierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTakeAwayOrderDto.html" data-type="entity-link" >CreateTakeAwayOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link" >CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto-1.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link" >Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/DelivereyOrder.html" data-type="entity-link" >DelivereyOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/DelivereyOrderType.html" data-type="entity-link" >DelivereyOrderType</a>
                            </li>
                            <li class="link">
                                <a href="classes/DineinOrder.html" data-type="entity-link" >DineinOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link" >Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeePDR.html" data-type="entity-link" >EmployeePDR</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeTransactionDto.html" data-type="entity-link" >EmployeeTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeTransactions.html" data-type="entity-link" >EmployeeTransactions</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsEmployeeGuard.html" data-type="entity-link" >IsEmployeeGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsWorkingInBranchGuard.html" data-type="entity-link" >IsWorkingInBranchGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogoutDto.html" data-type="entity-link" >LogoutDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Material.html" data-type="entity-link" >Material</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offer.html" data-type="entity-link" >Offer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderItems.html" data-type="entity-link" >OrderItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/RTGuard.html" data-type="entity-link" >RTGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInByEmailDto.html" data-type="entity-link" >SignInByEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Stock.html" data-type="entity-link" >Stock</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockGard.html" data-type="entity-link" >StockGard</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockItem.html" data-type="entity-link" >StockItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockItemQuantity.html" data-type="entity-link" >StockItemQuantity</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockItemslogs.html" data-type="entity-link" >StockItemslogs</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockTransaction.html" data-type="entity-link" >StockTransaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/Supplier.html" data-type="entity-link" >Supplier</a>
                            </li>
                            <li class="link">
                                <a href="classes/TakeAwayOrder.html" data-type="entity-link" >TakeAwayOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketUpdates.html" data-type="entity-link" >TicketUpdates</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBillingDto.html" data-type="entity-link" >UpdateBillingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBranchDto.html" data-type="entity-link" >UpdateBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartDto.html" data-type="entity-link" >UpdateCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCouponDto.html" data-type="entity-link" >UpdateCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCustomerDto.html" data-type="entity-link" >UpdateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeliveryDto.html" data-type="entity-link" >UpdateDeliveryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeDto.html" data-type="entity-link" >UpdateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLocationDto.html" data-type="entity-link" >UpdateLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMaterialDto.html" data-type="entity-link" >UpdateMaterialDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOfferDto.html" data-type="entity-link" >UpdateOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentDto.html" data-type="entity-link" >UpdatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRefreshDto.html" data-type="entity-link" >UpdateRefreshDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockDto.html" data-type="entity-link" >UpdateStockDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockItemDto.html" data-type="entity-link" >UpdateStockItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockItemLogsDto.html" data-type="entity-link" >UpdateStockItemLogsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockTransactionDto.html" data-type="entity-link" >UpdateStockTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSupplierDto.html" data-type="entity-link" >UpdateSupplierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link" >UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyandRefreshTokenDto.html" data-type="entity-link" >VerifyandRefreshTokenDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ATGuard.html" data-type="entity-link" >ATGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JWTGuard.html" data-type="entity-link" >JWTGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddTicketUpdatesInterface.html" data-type="entity-link" >AddTicketUpdatesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOrderInterface.html" data-type="entity-link" >CreateOrderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOrderItemsInterface.html" data-type="entity-link" >CreateOrderItemsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatePaymentInterface.html" data-type="entity-link" >CreatePaymentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeTransactionInterface.html" data-type="entity-link" >EmployeeTransactionInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockGardInterface.html" data-type="entity-link" >StockGardInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInterface.html" data-type="entity-link" >StockInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockItemInterface.html" data-type="entity-link" >StockItemInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockItemLogsInterface.html" data-type="entity-link" >StockItemLogsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockItemQuantityInterface.html" data-type="entity-link" >StockItemQuantityInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockTransactionInterface.html" data-type="entity-link" >StockTransactionInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TakeAwayOrderInterface.html" data-type="entity-link" >TakeAwayOrderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketInterface.html" data-type="entity-link" >TicketInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Token.html" data-type="entity-link" >Token</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});