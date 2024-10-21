<template>
  <el-card class="query-cancellation-container">
    <div class="appointment-content">
      <div class="appointment-title">预约信息</div>
      <div class="appointment-info">
        <p>您可以在这里查询或取消您的预约信息。</p>
      </div>

      <div class="appointment-buttons">
        <el-button type="primary">查询预约</el-button>
        <el-button type="danger">取消预约</el-button>
      </div>

      <div class="appointment-footer">感谢您的使用与支持！</div>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="QueryCancellation"></script>

<style lang="less" scoped>
.query-cancellation-container {
  .appointment-content {
    font-family: TencentSans-W3;
    .appointment-title {
      font-size: 24px;
      font-weight: bold;
      color: var(--p-text-color); // 标题颜色
      margin-bottom: 20px;
      font-family: TencentSans-W7;
    }

    .appointment-info {
      font-size: 16px;
      color: var(--p-title-color);
      margin-bottom: 20px;
    }

    .appointment-buttons {
      margin-top: 20px;
      .el-button {
        font-family: TencentSans-W3;
        padding-bottom: 11px;
      }
    }

    .appointment-footer {
      margin-top: 20px;
      font-size: 16px;
    }
  }
}
</style>
