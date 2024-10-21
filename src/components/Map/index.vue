<template>
  <div id="container" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
// darkblue - 黑夜模式
// normal - 正常模式

let map: any = null
let infoWindow: any = null

const { data } = defineProps(['data'])

onMounted(() => {
  AMapLoader.load({
    key: 'f4289104d7be0484a17a6f82a1b35430',
    version: '2.0'
  })
    .then(AMap => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 15, // 初始化地图级别
        mapStyle: 'amap://styles/normal', //设置地图的显示样式
        center: data?.center || [116.252095, 39.916635] // 初始化地图中心点位置
      })
      AMap.plugin(
        ['AMap.Scale', 'AMap.Geolocation', 'AMap.ToolBar', 'AMap.ControlBar'],
        () => {
          map.addControl(new AMap.Scale())
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.ControlBar())
          map.addControl(
            new AMap.Geolocation({
              position: {
                bottom: '80px',
                left: '15px'
              }
            })
          )
        }
      )
      map.on('click', (e: any) => {
        if (infoWindow) {
          infoWindow.close()
        }
        let info = `
          <div class=\'input-card content-window-card\'>
            <div class='input-img'>
              <img style="float:left;width:67px;height:16px;" src=" https://webapi.amap.com/images/autonavi.png "/>
              <h4>${data?.hosname}</h4>
            </div>
            <div style="padding-top:7px">
              <p class='input-item'>电话 : 520-1314   邮编 : 100102</p>
              <p class='input-item'>地址 : ${data?.param?.fullAddress}</p>
            </div>
          </div>
        `
        infoWindow = new AMap.InfoWindow({
          content: info,
          offset: new AMap.Pixel(16, -40)
        })
        infoWindow.open(map, e?.lnglat)
      })
    })
    .catch(e => {
      console.log(e, 111)
    })
})
onUnmounted(() => {
  map?.destroy()
})
</script>

<style lang="less" scoped>
.map-container {
  width: auto;
  height: 400px;
  margin: 10px 0 50px;
  :deep(.content-window-card) {
    font-size: 12px;
    font-family: TencentSans-W3;
    .input-img {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
    }
  }
}
</style>
