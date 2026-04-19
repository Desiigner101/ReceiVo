import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '1064020293504390612632edfaba1059': {
                        table: 'sys_security_acl'
                        id: '1064020293504390612632edfaba1059'
                    }
                    '1064020293504390612632edfaba1079': {
                        table: 'sys_security_acl'
                        id: '1064020293504390612632edfaba1079'
                    }
                    '1864020293504390612632edfaba1051': {
                        table: 'sys_ui_module'
                        id: '1864020293504390612632edfaba1051'
                    }
                    '1864020293504390612632edfaba106c': {
                        table: 'sys_security_acl'
                        id: '1864020293504390612632edfaba106c'
                    }
                    '2064420293504390612632edfaba1048': {
                        table: 'sys_security_acl'
                        id: '2064420293504390612632edfaba1048'
                    }
                    '3864420293504390612632edfaba10a7': {
                        table: 'sys_ui_module'
                        id: '3864420293504390612632edfaba10a7'
                    }
                    '3864420293504390612632edfaba10d1': {
                        table: 'sys_security_acl'
                        id: '3864420293504390612632edfaba10d1'
                    }
                    '5c64020293504390612632edfaba102d': {
                        table: 'sys_app_application'
                        id: '5c64020293504390612632edfaba102d'
                    }
                    '9064020293504390612632edfaba1036': {
                        table: 'sys_app_module'
                        id: '9064020293504390612632edfaba1036'
                    }
                    a064420293504390612632edfaba102f: {
                        table: 'sys_security_acl'
                        id: 'a064420293504390612632edfaba102f'
                    }
                    a864420293504390612632edfaba103b: {
                        table: 'sys_security_acl'
                        id: 'a864420293504390612632edfaba103b'
                    }
                    b064420293504390612632edfaba10c5: {
                        table: 'sys_security_acl'
                        id: 'b064420293504390612632edfaba10c5'
                    }
                    b464420293504390612632edfaba1054: {
                        table: 'sys_security_acl'
                        id: 'b464420293504390612632edfaba1054'
                    }
                    b864420293504390612632edfaba10a2: {
                        table: 'sys_app_module'
                        id: 'b864420293504390612632edfaba10a2'
                    }
                    b864420293504390612632edfaba10b8: {
                        table: 'sys_security_acl'
                        id: 'b864420293504390612632edfaba10b8'
                    }
                    bc64420293504390612632edfaba10dd: {
                        table: 'sys_security_acl'
                        id: 'bc64420293504390612632edfaba10dd'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '249fd210b5044931adec963b9bd16013'
                    }
                    dc64020293504390612632edfaba103e: {
                        table: 'sys_ui_application'
                        id: 'dc64020293504390612632edfaba103e'
                    }
                    e464420293504390612632edfaba1025: {
                        table: 'sys_app_module'
                        id: 'e464420293504390612632edfaba1025'
                    }
                    e464420293504390612632edfaba102a: {
                        table: 'sys_ui_module'
                        id: 'e464420293504390612632edfaba102a'
                    }
                    ec64020293504390612632edfaba1091: {
                        table: 'sys_security_acl'
                        id: 'ec64020293504390612632edfaba1091'
                    }
                    ed1e4f8b93088b10612632edfaba10c7: {
                        table: 'sys_security_acl'
                        id: 'ed1e4f8b93088b10612632edfaba10c7'
                    }
                    'incident-manager-page': {
                        table: 'sys_ui_page'
                        id: 'b9e7aae1a15c4f14937204510be68ef9'
                        deleted: true
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '8e4e46e3bc3047a6b0274a28dde41eb6'
                    }
                    'x_1984201_receivo/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'fdb36ac625df4fc48ebe67276769399c'
                        deleted: true
                    }
                    'x_1984201_receivo/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '68240727ec1c42fe9417e7e415a21698'
                        deleted: true
                    }
                }
                composite: [
                    {
                        table: 'sys_user_role'
                        id: '0064c2ce93104390612632edfaba1013'
                        key: {
                            name: 'x_1984201_receivo.notification_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0b17811009184613b4a3533e283e6cd8'
                        deleted: true
                        key: {
                            name: 'x_1984201_receivo_receipt__x_1984201_receivo_receipt_'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '0c6ac91d095d4e4c829db1da3f4fae54'
                        key: {
                            logical_table_name: 'x_1984201_receivo_notification'
                            col_name_string: 'related_receipt'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '142f3ffe95d9412da5fb59a3327355ff'
                        key: {
                            logical_table_name: 'x_1984201_receivo_notification'
                            col_name_string: 'user'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1c64020293504390612632edfaba1062'
                        key: {
                            sys_security_acl: '1064020293504390612632edfaba1059'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2669e69e70b54eac866ab96d1544075c'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2864020293504390612632edfaba10bf'
                        deleted: true
                        key: {
                            name: 'x_1984201_receivo_user__sys_user_'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '29652e96d8c144089911bdc230594293'
                        key: {
                            name: 'x_1984201_receivo_receipt'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '2f06a465447a4bdd92ac030e597af8cd'
                        key: {
                            name: 'x_1984201_receivo_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3464420293504390612632edfaba1075'
                        deleted: true
                        key: {
                            name: 'x_1984201_receivo_receipt__x_1984201_receivo_receipt_'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '34c875608e1449a68fb1804fc316198a'
                        deleted: true
                        key: {
                            name: 'x_1984201_receivo_user__sys_user_'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '37c40c0071a247548765fecaccca7b9e'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '448e79ed72e842eca9893e5a0c7705c9'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '47a4d2adb1f0499eb936390a0295c3d3'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'unread'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4d9eab579fcd47c4be2d046afe66f080'
                        deleted: true
                        key: {
                            name: 'x_1984201_receivo_receipt__x_1984201_receivo_receipt_'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4dd3af0ddc404870bddf48187226ffc6'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e76321619e14f2e97bb89bec8b4d79f'
                        key: {
                            name: 'x_1984201_receivo_user'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '518b5bde35434e09a4c5c439cf024be8'
                        key: {
                            name: 'x_1984201_receivo_receipt'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e4d6ae36b2d45f09216248b4d8729fc'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'related_receipt'
                        }
                    },
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
                        id: '7464420293504390612632edfaba10d7'
                        key: {
                            sys_security_acl: '3864420293504390612632edfaba10d1'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '780feba2f65240aaaf9660981020c77c'
                        key: {
                            name: 'x_1984201_receivo_receipt'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7c64420293504390612632edfaba104d'
                        key: {
                            sys_security_acl: '2064420293504390612632edfaba1048'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8564420293504390612632edfaba10f3'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '865ce3eec96a45bab8aec85fc7e9d4b3'
                        deleted: true
                        key: {
                            name: 'x_1984201_receivo_user__sys_user_'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '896dba55879343458e9337753217d993'
                        key: {
                            name: 'x_1984201_receivo_notification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '897ec540ec49440e9d65dd3315790d2e'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8b4b2be91a1f41a79d14c359e082f29a'
                        key: {
                            name: 'x_1984201_receivo_user'
                            element: 'NULL'
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
                        table: 'sys_db_object'
                        id: 'a60419059b0d4864ac76ef3100bb9f7f'
                        key: {
                            name: 'x_1984201_receivo_user'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ab275b4d84c04b65aa619bfda7363e08'
                        deleted: false
                        key: {
                            name: 'x_1984201_receivo/main'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ac2c9f8fab584b1cbdc180b5629d7a03'
                        deleted: false
                        key: {
                            name: 'x_1984201_receivo/main.js.map'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ac64020293504390612632edfaba1097'
                        key: {
                            sys_security_acl: 'ec64020293504390612632edfaba1091'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
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
                        table: 'sys_dictionary'
                        id: 'b1aa3bd6f6f44cd49c5b0143e7f7efe7'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b864420293504390612632edfaba1066'
                        key: {
                            sys_security_acl: 'b464420293504390612632edfaba1054'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc91840c6b574cc0acc3c802e90b2478'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c35c9f0ae03d485683cde0d1a8c8b465'
                        key: {
                            name: 'x_1984201_receivo_notification'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'c8e14627e3ab4b53a16081b5f4bbbc5e'
                        deleted: false
                        key: {
                            endpoint: 'x_1984201_receivo_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd464020293504390612632edfaba1072'
                        key: {
                            sys_security_acl: '1864020293504390612632edfaba106c'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd7ae47717a84ce9ad2f81b715b19a3e'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e464420293504390612632edfaba1041'
                        key: {
                            sys_security_acl: 'a864420293504390612632edfaba103b'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea70960941b54f4bad2ff64d288c02e2'
                        key: {
                            name: 'x_1984201_receivo_receipt'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eac3dc568493497987d1546b218f6c8b'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ec64020293504390612632edfaba107e'
                        key: {
                            sys_security_acl: '1064020293504390612632edfaba1079'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ec64420293504390612632edfaba1034'
                        key: {
                            sys_security_acl: 'a064420293504390612632edfaba102f'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f286747596e04a7bb032efbb02e71476'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'related_receipt'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f464420293504390612632edfaba10be'
                        key: {
                            sys_security_acl: 'b864420293504390612632edfaba10b8'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f83ed8f6605349f6a8d208247b925bd2'
                        key: {
                            name: 'x_1984201_receivo_notification'
                            element: 'unread'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f864420293504390612632edfaba10e3'
                        key: {
                            sys_security_acl: 'bc64420293504390612632edfaba10dd'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fc64420293504390612632edfaba10ca'
                        key: {
                            sys_security_acl: 'b064420293504390612632edfaba10c5'
                            sys_user_role: {
                                id: '0064c2ce93104390612632edfaba1013'
                                key: {
                                    name: 'x_1984201_receivo.notification_user'
                                }
                            }
                        }
                    },
                ]
            }
        }
    }
}
