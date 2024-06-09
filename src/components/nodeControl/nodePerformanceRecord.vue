<script>
export default {
  name: "nodePerformanceRecord"
}
</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          平均负载
          <div class="">
            <input type="datetime-local">
            <span>到</span>
            <input type="datetime-local">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          CPU
          <div class="">
            <input type="datetime-local">
            <span>到</span>
            <input type="datetime-local">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          内存
          <div class="">
            <input type="datetime-local">
            <span>到</span>
            <input type="datetime-local">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          磁盘IO
          <div class="">
            <input type="datetime-local">
            <span>到</span>
            <input type="datetime-local">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          网络吞吐
          <div class="">
            <input type="datetime-local">
            <span>到</span>
            <input type="datetime-local">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 45%;
    min-width: 300px;
    font-size: 14px;
    input {
      width: 35%;
      min-width: 120px;
      max-width: 140px;
    }
    span {
      margin: 0 5px;
    }
  }
}
</style>
