export default ({ app }, inject) => {
  let apiProtocol = "http";
  let apiHost = "localhost";
  // let apiHost = "192.168.19.77";
  let apiPort = ":8080/";
  let apiRootPath = apiProtocol + "://" + apiHost + apiPort;

  window.apiPathWin = app.apiPath = {
    // 地图服务接口
    mapServer : "http://192.168.16.49:6080/arcgis/rest/services/TEST/MapServer"

    // 查询管线接口
    ,testPipe : apiRootPath + "demo/testPipe"

    // 角色接口
    ,queryRoleList : apiRootPath + "role/queryRoleList" //查询角色列表
    ,saveRole : apiRootPath + "role/saveRole" //保存和更新角色
    ,deleteRole : apiRootPath + "role/deleteRole" //删除角色
    ,getPermissionListByAuth : apiRootPath + "permission/getPermissionListByAuth" //获取角色的权限列表

    ,queryAccountList : apiRootPath + "account/queryAccountList" //查询账号列表

    ,login : apiRootPath + "login" //登录
    ,logout : apiRootPath + "logout" //登出
    ,queryPermissionList : apiRootPath + "permission/queryPermissionList" //查询权限列表
    ,getPermissionListByRoleId : apiRootPath + "permission/getPermissionListByRoleId" //根据角色Id获取权限列表
    ,distributionPermission : apiRootPath + "permission/distributionPermission" //给角色分配权限

      //人员接口
      ,queryEmployeeList : apiRootPath + "employee/queryEmployeeList" //查询人员列表
      ,saveEmployee : apiRootPath + "employee/saveEmployee" //保存和更新人员
      ,deleteEmployee : apiRootPath + "employee/deleteEmployee" //删除人员
      ,selectEmployees : apiRootPath + "employee/getLabelValueForEmployee" //人员下拉框接口

      //账号接口
      ,queryAccountList : apiRootPath + "account/queryAccountList" //查询账号列表
      ,queryRoleListForAccount : apiRootPath + "role/queryRoleListForAccount" //查询角色列表--账号管理页面
      ,saveAccount : apiRootPath + "account/saveAccount" //新增或编辑账号
      ,deleteAccount : apiRootPath + "account/deleteAccount" //删除账号
      ,distributionRole : apiRootPath + "account/distributionRole" //给账户分配角色

      //管廊管理接口
      ,queryHolderList : apiRootPath + "holder/queryHolderList" //查询管架列表
      ,saveUsage : apiRootPath + "holder/saveUsage" //更新管架使用状态
      ,exportHolder : apiRootPath + "holder/exportHolder" //导出管架
      ,queryCheckReport : apiRootPath + "holder/queryCheckReport" //查询检测报告

      ,downloadPicture : apiRootPath + "download/downloadPicture"//管架图片

    //管架检测接口
    ,queryHolderCheckList : apiRootPath + "holderCheck/queryHolderCheckList" //查询管架检测列表
    ,upload : apiRootPath + "upload/upload" //上传文件
    ,saveCheckReport : apiRootPath + "holderCheck/saveCheckReport" //更新检测报告
    ,queryRepeat : apiRootPath + "holderCheck/queryRepeat" //查询是否检测报告重复
    ,queryTimeLine : apiRootPath + "holderCheck/queryTimeLine" //时间轴

    //管道台账接口
    ,queryPipeLineList : apiRootPath + "pipeLine/queryPipeLineList" //查询管道台账
    ,editPipeLine : apiRootPath + "pipeLine/editPipeLine" //编辑管道
    ,exportPipeLine : apiRootPath + "pipeLine/exportPipeLine" //导出管道

    //库区台账接口
    ,queryConnectAreaList : apiRootPath + "connectArea/queryConnectAreaList" //查询库区台账
    ,editConnectArea : apiRootPath + "connectArea/editConnectArea" //编辑库区
    ,exportConnectArea : apiRootPath + "connectArea/exportConnectArea" //导出库区



    //字典表下拉框接口
    ,queryDictionaryItemList : apiRootPath + "dictionary/getLabelValue"
    //字典表下拉框接口--label和value一样
    ,queryDictionaryItemNoValueList : apiRootPath + "dictionary/getLabelValueNoValue"
    //库区下拉框接口--label和value一样
    ,queryConnectAreaNoValueList : apiRootPath + "connectArea/getConnectAreaCombo"
    //下载文件
    ,downloadFile : apiRootPath + "download/downloadFile"




  }

    window.routerPath = app.routerPath = {
      home : "/" // 主页面
      ,login : "/auth/login" // 登录页面
      ,logout : "/auth/logout" // 登录页面
      ,error : "/error" // 错误页面
    }

     window.dictionaryCatagoty = app.dictionaryCatagoty = {
       // 使用状态ID
       useStateId : "1"
       // 使用单位ID
       ,useCompanyId : "2"
       // 运输货类ID
       ,transportGoodsId : "3"
       // 管道材质ID
       ,pipeMaterialId : "4"
       // 所属区域ID
       ,areaId : "5"
        // 管架材质ID
        ,qualityId : "6"
     }
}
