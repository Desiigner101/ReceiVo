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
                    package_json: {
                        table: 'sys_module'
                        id: '8e4e46e3bc3047a6b0274a28dde41eb6'
                    }
                }
                composite: [
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
