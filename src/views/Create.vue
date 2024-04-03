<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const formNameErr = ref("");
const formCountErr = ref("");
const formDecayErr = ref("");

const formData = new FormData();
const image = ref(null);
const form = reactive({
  name: "",
  count: "",
  decay: "",
});

function create() {
  //正則表達驗證
  const nameCheck = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
  const numberCheck = /^(?:10000|\d{1,4})$/;
  if (!nameCheck.test(form.name)) {
    formNameErr.value = "中文,英文,0~9";
    return;
  } else {
    formNameErr.value = "";
  }
  if (!numberCheck.test(form.count) || form.count == "0") {
    formCountErr.value = "1~10000";
    return;
  } else {
    formCountErr.value = "";
  }
  if (!numberCheck.test(form.decay)) {
    formDecayErr.value = "0~10000";
    return;
  } else {
    formDecayErr.value = "";
  }

  formData.append("name", form.name);
  formData.append("count", form.count);
  formData.append("decay", form.decay);

  axios
    .post(window.apiDns + "create", formData)
    .then((response) => {
      form.name = "";
      form.count = "";
      form.decay = "";
      image.value = null;

      alert(response.data.message + ",請耐心等待驗證");

      const router = useRouter();
      router.push("/");
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
}
function getCookieValue() {
  const cookieName = "cookie";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}
//選擇圖片的方法
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    formData.append("img", file);
    console.log("Selected file:", file);
  } else {
    image.value = null;
    console.log("User canceled file selection");
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 mt-5">
        <div class="mb-3">
          <label for="formFile" class="form-label">角色名稱</label>
          <input class="form-control" type="text" v-model="form.name" />
          <span style="color: red">{{ formNameErr }}</span>
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">場次</label>
          <input
            class="form-control"
            type="number"
            min="1"
            max="10000"
            v-model="form.count"
          />
          <span style="color: red">{{ formCountErr }}</span>
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">衰變數量</label>
          <input
            class="form-control"
            type="number"
            min="0"
            max="10000"
            v-model="form.decay"
          />
          <span style="color: red">{{ formDecayErr }}</span>
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label"
            >圖片：角色照+現在地下城次數(活動面板) 限.jpg.png 5M大小
            <a
              href="https://capybaby.cc/mabinogi/statistics/img/水豚仔萌萌.jpg"
              class="btn btn-primary"
              target="_blank"
              >範例圖</a
            >
          </label>
          <input
            class="form-control"
            type="file"
            @change="handleFileChange"
            accept=".jpg, .png"
          />
          <span style="color: red"></span>
        </div>

        <button type="button" @click="create" class="btn btn-primary">
          上傳資料!!!
        </button>

        <span style="color: red"></span>

        <br />
        <router-link to="/" class="btn btn-danger mt-5">點我返回</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
