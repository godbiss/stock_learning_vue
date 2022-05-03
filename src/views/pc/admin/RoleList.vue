<template>
    <div class="userlist-container">
        <el-table
            :data="roleList"
            :default-sort = "{prop: 'id', order: 'ascending'}"
            border
            style="width: 100%">
            <el-table-column
            prop="id"
            sortable
            label="角色id">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名">
            </el-table-column>
            <el-table-column
            prop="roleCode"
            label="角色代号">
            </el-table-column>
            <el-table-column
            prop="roleDescription"
            label="角色描述">
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

        <el-dialog title="更新用户类型" :visible.sync="updateRoleFormVisible">
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateRoleFormVisible = false; updateRoleItem= null">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>

export default {
  data () {
    return {
      roleList: [],
      updateRoleFormVisible: false,
      key: '',
      updateRoleItem: null
    }
  },
  methods: {
    initkey () {
      this.key = Math.random() + '' + new Date().getTime()
    },
    handleUpdate (row) {
      console.log('handleUpdate', row)
      this.updateRoleItem = row
      this.updateRoleFormVisible = true
      this.initkey()
    },
    handleRemove (row) {
      console.log('handleRemove', row)
    }
  },
  mounted () {
    this.$axios.get('/api/role/list').then(res => {
      console.log(res)
      this.roleList = res.data.data
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
