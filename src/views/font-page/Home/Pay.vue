<template>
  <div>
    <p style="text-align: left">
      Information entry
    </p>
    <el-row :justify="'center'">
      <el-col :span="8">
        <el-form :label-position="'top'" disabled>
          <el-form-item label="User">
            <el-input v-model="order.createBy"></el-input>
          </el-form-item>
          <el-form-item label="Stadium">
            <el-input v-model="order.Stadium"></el-input>
          </el-form-item>
          <el-form-item label="Cash">
            <el-input v-model="order.price"></el-input>
          </el-form-item>
          <el-form-item label="Date">
            <el-input v-model="order.tableTime"></el-input>
          </el-form-item>
          <el-form-item label="Start">
            <el-input v-model="order.rangStart"></el-input>
          </el-form-item>
          <el-form-item label="end">
            <el-input v-model="order.rangEnd"></el-input>
          </el-form-item>
        </el-form>
        <el-button color="#a951ae" style="color: white;width: 120px;height: 40px;border-radius: 20px" @click="save">
          Save
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {appointmentApi, orderApi} from "@/api/api";
import {getUser} from "@/utils/authutil";
import router from "@/router";

export default {
  name: "Pay",
  data() {
    return {
      id: '',
      appointment: {},
      type: '',
      order: {
        name: '',
        price: 0,
        tableTime: '',
        rangeStart: '',
        rangeEnd: '',
        createBy: '',
        Stadium: ''
      }
    }
  },
  methods: {
    getUser,
    initAppointment() {
      appointmentApi.getById(this.id)
          .then((resp) => {
            this.appointment = resp.data.data
            this.order = {
              name: this.appointment.activity.name,
              price: this.appointment.activity.price,
              tableTime: this.appointment.timetable.tableTime,
              rangStart: this.appointment.timetable.rangStart,
              rangEnd: this.appointment.timetable.rangEnd,
              createBy: this.appointment.createBy,
              Stadium: this.appointment.stadium.name,
              stadiumId: this.appointment.stadium.id,
              payType: this.type,
              appointmentId:this.appointment.id
            }
          })
    },
    save() {
      orderApi.add(this.order)
          .then(() => {
            router.push({path: '/MyOrder'})
          })
    }
  },
  mounted() {
    this.initAppointment()
  },
  created() {
    this.id = this.$route.query.id
    this.type = this.$route.query.pay
  }
}
</script>

<style scoped lang="scss">

</style>