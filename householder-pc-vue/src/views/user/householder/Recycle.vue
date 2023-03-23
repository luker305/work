<template>
  <div>
    <el-form :inline="true" ref="filterForm" :model="filter" size="mini">
      <el-form-item label="关键字" prop="keywordsLike">
        <el-input
          v-model="filter.keywordsLike"
          placeholder="姓名/账号/住户/联系电话/QQ"
          clearable
          @keyup.enter.native="delQuery"
          @clear="delQuery"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="delQuery()">查询</el-button>
        <el-button @click="resetForm('filterForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="householderListTable"
      highlight-current-row
      stripe
      :header-cell-style="{ fontSize: '14px' }"
      size="mini"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="userName" label="账号"></el-table-column>
      <el-table-column prop="title" label="住户"></el-table-column>
      <el-table-column prop="tel" label="联系电话"></el-table-column>
      <el-table-column prop="QQ" label="QQ"></el-table-column>
      <el-table-column width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="recycleHouseholder(scope.row.uuid)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[1, 2, 3, 10]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      householderListTable: [],
      filter: {
        keywordsLike: "",
        status: ""
      },
      pagination: {
        page: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  created() {
    this.refreshPage();
  },
  activated() {
    this.refreshPage();
  },
  methods: {
    refreshPage() {
      this.delQuery();
    },
    async delQuery() {
      let params = {};
      params.filter = this.filter;
      params.pagination = this.pagination;
      // console.log(params)
      const res = await this.$api.householder.delQuery(params);
      this.householderListTable = res.rows;
      this.total = res.count;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      // 数据重新加载....
      this.refreshPage();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.page = val;
      // 数据重新加载....
      this.refreshPage();
    },
    recycleHouseholder(uuid) {
      this.$confirm("确定恢复该住户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 更新字段deleted的值为1
          await this.$api.householder.reModify({ uuid });

          this.$message({
            type: "success",
            message: "恢复成功"
          });
          this.refreshPage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
    
  <style>
</style>