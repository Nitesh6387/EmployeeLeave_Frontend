import axios from "axios"

const BASE_URL = 'http://localhost:8000'
export const EmpLogin = async (payload) => {
   const response = await axios.post(`${BASE_URL}/emp-login`, payload)
   return response?.data
}
export const EmpRegister = async (payload) => {
   const response = await axios.post(`${BASE_URL}/emp-register`, payload)
   return response?.data
}
export const EmpLeaveApply = async (payload) => {
   const response = await axios.post(`${BASE_URL}/apply-leave`, payload)
   return response?.data
}

export const GetLeavesByEmpId = async (empId) => {
   const response = await axios.get(`${BASE_URL}/myleaves/${empId}`)
   return response?.data
}
export const GetAllLeaves = async () => {
   const response = await axios.get(`${BASE_URL}/all-leaves`)
   return response?.data
}
export const GetAllEmployees = async () => {
   const response = await axios.get(`${BASE_URL}/all-employees`)
   return response?.data
}

export const UpdateLeaveStatus = async (id, status) => {
   const res = await axios.put(`${BASE_URL}/update-leave-status/${id}`, { status });
   return res.data;
};
