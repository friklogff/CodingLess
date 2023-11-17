<template>
    <!-- 部门管理组件 -->
    <div style="width: 500px;">
        <!-- 部门搜索框 -->
        <el-input
            placeholder="请输入部门名称进行搜索..."
            prefix-icon="el-icon-search"
            v-model="filterText">
        </el-input>

        <!-- 部门树 -->
        <el-tree
            :data="deps"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree">
            <!-- 自定义部门树节点 -->
            <span class="custom-tree-node" style="display: flex;justify-content: space-between;width: 100%;"
                  slot-scope="{ node, data }">
                <!-- 部门名称 -->
                <span>{{data.name }}</span>
                <!-- 操作按钮 -->
                <span>
                    <el-button
                        type="primary"
                        size="mini"
                        class="depBtn"
                        @click="() => showAddDepView(data)">
                        添加部门
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        class="depBtn"
                        @click="() => deleteDep(data)">
                        删除部门
                    </el-button>
                </span>
            </span>
        </el-tree>

        <!-- 添加部门对话框 -->
        <el-dialog
            title="添加部门"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <table>
                    <!-- 上级部门显示 -->
                    <tr>
                        <td>
                            <el-tag>上级部门</el-tag>
                        </td>
                        <td>{{pname}}</td>
                    </tr>
                    <!-- 部门名称输入 -->
                    <tr>
                        <td>
                            <el-tag>部门名称</el-tag>
                        </td>
                        <td>
                            <el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 对话框底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="doAddDep">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "DepMana",
    data() {
        return {
            dialogVisible: false,
            filterText: '',
            dep: {
                name: '',
                parentId: -1
            },
            pname: '',
            deps: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted() {
        this.initDeps();
    },
    methods: {
        // 初始化部门数据及相关变量
        initDep() {
            this.dep = {
                name: '',
                parentId: -1
            }
            this.pname = '';
        },
        // 将新增部门添加到部门数据中
        addDep2Deps(deps, dep) {
            for (let i = 0; i < deps.length; i++) {
                let d = deps[i];
                if (d.id == dep.parentId) {
                    d.children = d.children.concat(dep);
                    if (d.children.length > 0) {
                        d.parent = true;
                    }
                    return;
                } else {
                    this.addDep2Deps(d.children, dep);
                }
            }
        },
        // 执行添加部门的操作
        doAddDep() {
            this.postRequest("/system/basic/department/", this.dep).then(resp => {
                if (resp) {
                    this.addDep2Deps(this.deps, resp.obj);
                    this.dialogVisible = false;
                    // 初始化变量
                    this.initDep();
                }
            })
        },
        // 从部门数据中删除指定部门
        removeDepFromDeps(p, deps, id) {
            for (let i = 0; i < deps.length; i++) {
                let d = deps[i];
                if (d.id == id) {
                    deps.splice(i, 1);
                    if (deps.length == 0) {
                        p.parent = false;
                    }
                    return;
                } else {
                    this.removeDepFromDeps(d, d.children, id);
                }
            }
        },
        // 删除部门，包括确认提示
        deleteDep(data) {
            if (data.parent) {
                this.$message.error("父部门删除失败");
            } else {
                this.$confirm('此操作将永久删除【' + data.name + '】部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/department/" + data.id).then(resp => {
                        if (resp) {
                            this.removeDepFromDeps(null, this.deps, data.id);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        // 显示添加部门对话框
        showAddDepView(data) {
            this.pname = data.name;
            this.dep.parentId = data.id;
            this.dialogVisible = true;
        },
        // 初始化部门数据
        initDeps() {
            this.getRequest("/system/basic/department/").then(resp => {
                if (resp) {
                    this.deps = resp;
                }
            })
        },
        // 部门树节点过滤方法
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }
    }
}
</script>

<style>
.depBtn {
    padding: 2px;
}
</style>
