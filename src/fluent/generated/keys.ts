import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '249fd210b5044931adec963b9bd16013'
                    }
                    ed1e4f8b93088b10612632edfaba10c7: {
                        table: 'sys_security_acl'
                        id: 'ed1e4f8b93088b10612632edfaba10c7'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '8e4e46e3bc3047a6b0274a28dde41eb6'
                    }
                }
                composite: [
                    {
                        table: 'sys_ui_page'
                        id: '6c37cb0f93c48b10612632edfaba103b'
                        deleted: false
                        key: {
                            endpoint: 'x_1984201_receivo_vault_page.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a11e03cb93088b10612632edfaba1034'
                        key: {
                            sys_security_acl: 'ed1e4f8b93088b10612632edfaba10c7'
                            sys_user_role: {
                                id: 'b0593b350a0a0aa7001d689e4542dc28'
                                key: {
                                    name: 'public'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ab275b4d84c04b65aa619bfda7363e08'
                        key: {
                            name: 'x_1984201_receivo/main'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ac2c9f8fab584b1cbdc180b5629d7a03'
                        key: {
                            name: 'x_1984201_receivo/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'acca60aa022745209c3380c1d9933a87'
                        key: {
                            endpoint: 'x_1984201_receivo_home page.do'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'c8e14627e3ab4b53a16081b5f4bbbc5e'
                        key: {
                            endpoint: 'x_1984201_receivo_incident_manager.do'
                        }
                    },
                ]
            }
        }
    }
}
