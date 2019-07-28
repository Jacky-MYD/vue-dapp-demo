<template>
  <div class="form-container">
    <el-form ref="form" :model="form" label-width="70px" >
      <el-form-item label="昵称" required>
        <el-input v-model="form.name" placeholder="请输昵称" ></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <UploadAvatarPicture ref="uploader" :label="label"></UploadAvatarPicture>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
        <el-button @click="onReset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import UploadAvatarPicture from '../components/UploadAvatarPicture'
  export default {
    name: 'Register',
    data () {
      return {
        'label':'头像',
        form: {
          name: '',
          password: '',
          avatar: ''
        },
      }
    },
    components: {
      'UploadAvatarPicture': UploadAvatarPicture
    },
    computed: {
        ...mapState({
            web3: state => state.api.web3,
            accountContract: state => state.api.accountContract,            })
    },
    methods: {
      onReset() {
        this.form.name = '';
        this.form.password = '';
        this.form.avatar = '';
        this.$refs.uploader.handleRemove();
      },
      async onSubmit() {
        if(!this.form.name) {
          this.$message.error('昵称不能为空');
          return false;
        }
        if(!this.form.password) {
          this.$message.error('密码不能为空');
          return false;
        }
        if(! /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/.test(this.form.name)){
          this.$message.error('昵称只能为3~20位中文英文或者数字的组合');
          return false;
        }
        var self = this;
        try {
          await this.$refs.uploader.submitUpload().then(res=>{
            
            this.accountContract().methods.registerMember(this.form.name, res)
              .send({
                from: this.web3.coinbase,
                gas: 300000
              })
              .on('receipt', async function (receipt) {
                console.log(343434, receipt, res);
                let param = {
                  userName: self.form.name,
                  password: self.form.password,
                  avatarHash: res
                }
                await self.$store.dispatch('register', param).then(data => {
                  console.log(1111, data)
                  self.$message.success('注册成功');
                  self.form.name = '';
                  self.form.password = '';
                  self.onReset();
                });
              })
              .on('error', function (error) {
                self.$message.error('注册失败');
                self.onReset();
              })
          })
            .catch(err => {
              console.log(err);
            })
        } catch (e) {
          console.log(e)
        }
      }
    },
    created() {
      
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .form-container {
    width: 550px;
    height: 360px;
    margin: auto auto;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 4px silver;
  }
</style>
