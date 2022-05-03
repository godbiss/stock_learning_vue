<template>
    <div class="userlist-container">
        <el-table
                :data="userRolelist"
                :default-sort = "{prop: 'user.id', order: 'ascending'}"
                border
                style="width: 100%">
                <el-table-column
                prop="user.id"
                sortable
                label="用户id">
                </el-table-column>
                <el-table-column
                prop="user.userName"
                label="用户名">
                </el-table-column>
                <el-table-column
                prop="role.roleName"
                label="角色名">
                </el-table-column>
                <el-table-column
                prop="role.roleDescription"
                label="角色描述">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">更新</el-button>
                </template>
                </el-table-column>
            </el-table>

        <el-dialog title="更新用户类型" :visible.sync="updateUserRoleFormVisible">
            <update-user-role :userRole="updateUserRoleItem" :key="key"></update-user-role>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateUserRoleFormVisible = false; updateUserRoleItem= null">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import UpdateUserRole from './components/UpdateUserRole.vue'

export default {
  components: { UpdateUserRole },
  data () {
    return {
      userRolelist: [],
      updateUserRoleFormVisible: false,
      key: '',
      updateUserRoleItem: null
    }
  },
  methods: {
    initkey () {
      this.key = Math.random() + '' + new Date().getTime()
    },
    handleUpdate (row) {
      console.log('handleUpdate', row)
      this.updateUserRoleItem = row
      this.updateUserRoleFormVisible = true
      this.initkey()
    }
  },
  mounted () {
    this.$axios.get('/api/user/listUserWithRole').then(res => {
      console.log(res)
      this.userRolelist = res.data.data
    })
  }
}
</script>

<style lang='less' scoped>
    .userlist-container {
        width: 100%;
        height: 100%;

        .operation-butt-group{
            width: 100%;
            display: flex;
            justify-content: flex-end;

            margin-top: 10px;
        }
    }
</style>
