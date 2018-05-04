export const state = () => ({

  /*菜单的code 权限控制*/
  system_employee: false,
  system_account: false,
  system_role: false,
  mapMenu: true,

  /*按钮的code 权限控制*/
  // 角色管理
  id_role_add: false,
  id_role_edit: false,
  id_role_delete: false,
  id_role_assign: false,
  
  //人员管理
  id_employee_add: false,
  id_employee_edit: false,
  id_employee_delete: false,

  // 账户管理
  id_account_add: false,
  id_account_edit: false,
  id_account_delete: false,
  id_account_assign: false

})

export const mutations = {
  btnShow (state, data) {
    state[data.commit] = data.flag
  }

}

export const actions = {
  btnShow ({ commit }, data) {
    commit("btnShow", data )
  }
}


