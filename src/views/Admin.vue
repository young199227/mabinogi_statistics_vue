<script setup  lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

//一進入先拿資料
getUnverifiedUploads();

//拿首頁資料
const unverifiedData = ref("");
function getUnverifiedUploads() {
  axios
    .get(window.apiDns + "/unverified")
    .then((response) => {
      unverifiedData.value = response.data;
    })
    .catch((error) => {
      console.error(error);
      router.push("/");
    });
}
//審核
function verifyUserUploads(type: number, id: string) {
  axios
    .put(window.apiDns + "/verify/" + type, {
      id: id,
    })
    .then((response) => {
    //   console.log(response.data);
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 mt-2">
        <div class="card mt-3" v-for="item in unverifiedData" :key="item.id">
          <img :src="item.image" class="card-img-top" />
          <div class="card-body">
            <h3 class="card-title mt-2">{{ item.name }}</h3>
            <br />
            <table class="table table-hover">
              <tbody>
                <tr>
                  <td>場次:</td>
                  <td>{{ item.count }}</td>
                </tr>
                <tr>
                  <td>衰變數量:</td>
                  <td>{{ item.decay }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <a :href="item.image" class="btn btn-primary">詳細圖!</a>　
            <button
              @click="verifyUserUploads(1, item.id)"
              class="btn btn-primary"
            >
              通過</button
            >　
            <button
              @click="verifyUserUploads(2, item.id)"
              class="btn btn-danger"
            >
              不通過
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
