<template>
  <div class="qutpatientInfo-container">
    <el-card>
      <div class="qutpatientInfo-content">
        <div class="qutpatientInfo-title">停诊通知</div>
        <div class="qutpatientInfo-date">
          停诊时间：<strong>2024年10月1日 - 2099年10月5日</strong>
        </div>
        <div class="qutpatientInfo-info">
          <p>
            因系统升级，医院将于上述时间段停诊。停诊期间，您可以通过以下方式进行咨询：
          </p>
          <ul>
            <li>咨询电话：<strong>123-456-7890</strong></li>
            <li>邮箱：<strong>info@hospital.com</strong></li>
          </ul>
        </div>
        <div class="qutpatientInfo-footer">感谢您的理解与支持！</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="QutpatientInfo"></script>

<style lang="less" scoped>
.qutpatientInfo-container {
  font-family: TencentSans-W3;
  .qutpatientInfo-title {
    font-size: 24px;
    font-weight: bold;
    color: #e74c3c; /* 标题颜色 */
    margin-bottom: 20px;
    font-family: TencentSans-W7;
  }

  .qutpatientInfo-date {
    font-size: 18px;
    color: var(--p-title-color); /* 日期颜色 */
    margin-bottom: 15px;
  }

  .qutpatientInfo-info {
    font-size: 16px;
    color: var(--p-title-color); /* 日期颜色 */
  }

  .qutpatientInfo-info ul {
    list-style-type: none; /* 去掉默认的样式 */
  }

  .qutpatientInfo-info li {
    margin: 10px 0;
  }

  .qutpatientInfo-footer {
    margin-top: 20px;
    font-size: 16px;
  }
}
</style>
