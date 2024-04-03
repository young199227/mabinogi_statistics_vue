<script setup  lang="ts">
import { ref } from "vue";
import axios from "axios";

//一進入先拿資料
getIndexData();

//拿首頁資料
const indexData = ref("");
function getIndexData() {
  axios
    .get(window.apiDns + "/indexData")
    .then((response) => {
      // console.log(response.data);
      indexData.value = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 mt-3">
        <div class="card d-flex align-items-center justify-content-center">
          <div class="card-body">
            <h5 class="card-title mt-2" style="text-align: center">衰變統計</h5>
            <table class="table table-hover" style="text-align: center">
              <tbody>
                <tr>
                  <td>上傳次數:</td>
                  <td>{{ indexData.count.user_count }}</td>
                </tr>
                <tr>
                  <td>場次:</td>
                  <td>{{ indexData.count.sum }}</td>
                </tr>
                <tr>
                  <td>衰變:</td>
                  <td>{{ indexData.count.sum_decay }}</td>
                </tr>
                <tr>
                  <td>機率:</td>
                  <td>{{ indexData.count.probability_decay }}</td>
                </tr>
                <!-- <tr>
                  <td>　</td>
                  <td>　</td>
                </tr>
                <tr>
                  <td>最多場次:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>歐洲人:</td>
                  <td></td>
                </tr> -->
                <tr></tr>
              </tbody>
            </table>
            <div class="text-center">
              <router-link to="/create" class="btn btn-primary">
                點我去上傳資料!
              </router-link>
            </div>
          </div>
        </div>
        <br />

        <!-- <table class="table table-hover" style="text-align: center"></table> -->

        <table
          class="table table-hover table-striped"
          style="text-align: center"
        >
          <thead>
            <tr>
              <th>角色名稱</th>
              <th>場次</th>
              <th>衰變數量</th>
              <th>機率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in indexData.user" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.decay }}</td>
              <td>{{ item.probability }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
