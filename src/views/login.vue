<template>
  <van-nav-bar
    :border="false"
    right-text="注册"
    @click-right="toRegister"
  />
  <div class="main">
    <h2>登录</h2>
    <p>你好，欢迎使用Xchat</p>
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="user.userName"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <van-field
        v-model="user.passWord"
        type="password"
        name="passWord"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div class="btn">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { ref, reactive  } from 'vue'
import { useRouter } from 'vue-router'
import * as Login from '@/api/login.js'
import { Toast } from 'vant';
export default {
  setup() {
    /** 使用路由 */
    const router = useRouter()

    const user = reactive({
      userName: '',
      passWord: ''
    })

    const onSubmit = async value => {
      const data = await Login.login(value)
      if (!data.match) return Toast.fail(data.errorMessage)
      localStorage.setItem("user", JSON.stringify(data))
      router.replace('/home')
    }

    const toRegister = _ => {
      router.push('/register')
    }
    return {
      user,
      onSubmit,
      toRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0 16px;
  h2 {
    margin-top: 100px;
  }
  p {
    font-size: 20px;
    color: rgba(39, 40, 50, 0.5);
  }
  .form {
    margin-top: 50px;
  }
  .btn {
    margin-top: 50px;
  }
}
</style>