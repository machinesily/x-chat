<template>
  <van-nav-bar
    :border="false"
    left-arrow
    @click-left="back"
  />
  <div class="main">
    <h2>注册</h2>
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="params.userName"
        name="userName"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名', validator: validatorName }]"
      />
      <van-field
        v-model="params.userMail"
        name="userMail"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[
        { required: true, message: '请输入邮箱' },
        { pattern, message: '邮箱格式错误' },
        { validator: validatorMail }]"
      />
      <van-field
        v-model="params.passWord"
        type="password"
        name="passWord"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div class="btn">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import * as getRegister from '@/api/register.js'
export default {
  setup() {
    const router = useRouter()
    const back = _ => router.back()
    const params = reactive({
      userName: '',
      userMail: '',
      passWord: ''
    })

    /** 注册提交 */
    const onSubmit = async params => {
      const data = await getRegister.register(params)
      router.push(`/login`)
    }

    /** 邮箱异步验证 */
    const validatorMail = async val => {
      const data = await getRegister.countUser({
        userMail: val
      })
      return data ? '该邮箱已被注册' : ''
    }
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    /** 用户名异步验证 */
    const validatorName = async val => {
      const data = await getRegister.countUser({
        userName: val
      })
      return data ? '该用户名已被注册' : ''
    }

    return {
      back,
      onSubmit,
      params,
      validatorName,
      validatorMail,
      pattern
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
  .form {
    margin-top: 30px;
  }
  .btn {
    margin-top: 50px;
  }
}
</style>