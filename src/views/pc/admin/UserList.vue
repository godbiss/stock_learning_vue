<template>
    <div class="userlist-container">
        <el-table
                :data="userList"
                border
                style="width: 100%">
                <el-table-column
                prop="account"
                label="账号">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="用户名">
                </el-table-column>
                <el-table-column
                prop="phoneNumber"
                label="电话号码">
                </el-table-column>
                <el-table-column
                prop="money"
                label="余额">
                </el-table-column>
                <el-table-column
                label="头像">
                <template slot-scope="scope">
                    <el-avatar fit="fill" :size="40" :src="scope.row.avator"></el-avatar>
                </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建日期">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="更新日期">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">更新</el-button>
                    <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="operation-butt-group">
                <el-button type="primary" @click="handleCreateUser">添加用户</el-button>
            </div>

        <el-dialog title="添加用户" :visible.sync="createUserFormVisible">
            <create-user-form></create-user-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createUserFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="更新用户" :visible.sync="updateUserFormVisible">
            <update-user-form :user="updateUserItem" :key="key"></update-user-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateUserFormVisible = false; updateUserItem= null">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import CreateUserForm from './components/CreateUserForm.vue'
import UpdateUserForm from './components/UpdateUserForm.vue'
export default {
  components: { CreateUserForm, UpdateUserForm },
  data () {
    return {
      userList: [],
      createUserFormVisible: false,
      updateUserFormVisible: false,
      key: '',
      updateUserItem: null
    }
  },
  methods: {
    initkey () {
      this.key = Math.random() + '' + new Date().getTime()
    },
    handleUpdate (row) {
      console.log('handleUpdate', row)
      this.updateUserItem = row
      this.updateUserFormVisible = true
      this.initkey()
    },
    handleRemove (row) {
      console.log('handleRemove', row)
      this.$axios.delete('/api/user/delete/' + row.id).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '删除用户成功',
            type: 'success'
          })
          location.reload()
        }
      })
    },
    handleCreateUser () {
      this.createUserFormVisible = true
    }
  },
  mounted () {
    this.$axios.get('/api/user/list').then(res => {
      console.log(res)
      this.userList = res.data.data
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
