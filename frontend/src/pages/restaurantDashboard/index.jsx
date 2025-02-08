import React from 'react'
import bag from '../../assets/image/ic_glass_bag.png'
import buy from '../../assets/image/ic_glass_buy.png'
import user from '../../assets/image/ic_glass_users.png'
import message from '../../assets/image/ic_glass_message.png'
import {
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const RestaurantDashboard = () => {
  const data = [
    { name: 'Jan', Revenue: 30, UserAcess: 60, TeamC: 40 },
    { name: 'Feb', Revenue: 10, UserAcess: 20, TeamC: 30 },
    { name: 'Mar', Revenue: 40, UserAcess: 70, TeamC: 60 },
    { name: 'Apr', Revenue: 20, UserAcess: 50, TeamC: 20 },
    { name: 'May', Revenue: 30, UserAcess: 40, TeamC: 50 },
    { name: 'Jun', Revenue: 50, UserAcess: 30, TeamC: 70 },
    { name: 'Jul', Revenue: 40, UserAcess: 60, TeamC: 60 },
    { name: 'Aug', Revenue: 60, UserAcess: 80, TeamC: 50 },
    { name: 'Sep', Revenue: 20, UserAcess: 30, TeamC: 40 },
    { name: 'Oct', Revenue: 50, UserAcess: 60, TeamC: 50 },
  ]

  const data_PiaChart = [
    { name: 'Processing', value: 34.7, color: '#FBBC05' },
    { name: 'Success', value: 36.9, color: '#34A853' },
    { name: 'Cancle', value: 28.4, color: '#EA4335' },
  ]
  return (
    <div className='mx-5 my-2 px-3 py-4'>
      <h3 className='text-3xl font-[700] font-family color-1 text-left mb-4'>
        Hi,Welcome Dashboard👋
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-3'>
        <div className='w-[calc(100%*12/12)]  sm:w-[calc(100%*3/3)]'>
          <div className=' flex bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] px-6 py-8 rounded-[16px]'>
            <div className='w-[64px] h-[64px]'>
              <img src={bag} className='w-full' />
            </div>
            <div className='ml-6 flex flex-col'>
              <h4 className='font-[700] text-[1.25rem] leading-6'>714k</h4>
              <h6 className='font-[600] text-[#919EAB] text-[0.8rem] '>Weekly Sales</h6>
            </div>
          </div>
        </div>
        <div className='w-[calc(100%*12/12)]  sm:w-[calc(100%*3/3)]'>
          <div className='flex bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] px-6 py-8 rounded-[16px]'>
            <div className='w-[64px] h-[64px]'>
              <img src={user} className='w-full' />
            </div>
            <div className='ml-6 flex flex-col'>
              <h4 className='font-[700] text-[1.25rem] leading-6'>125</h4>
              <h6 className='font-[600] text-[#919EAB] text-[0.8rem] '>New Users</h6>
            </div>
          </div>
        </div>
        <div className='w-[calc(100%*12/12)]  sm:w-[calc(100%*3/3)]'>
          <div className='flex bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] px-6 py-8 rounded-[16px]'>
            <div className='w-[64px] h-[64px]'>
              <img src={buy} className='w-full' />
            </div>
            <div className='ml-6 flex flex-col'>
              <h4 className='font-[700] text-[1.25rem] leading-6'>100</h4>
              <h6 className='font-[600] text-[#919EAB] text-[0.8rem] '>Item Orders</h6>
            </div>
          </div>
        </div>
        <div className='w-[calc(100%*12/12)]  sm:w-[calc(100%*3/3)]'>
          <div className='flex bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] px-6 py-8 rounded-[16px]'>
            <div className='w-[64px] h-[64px]'>
              <img src={message} className='w-full' />
            </div>
            <div className='ml-6 flex flex-col'>
              <h4 className='font-[700] text-[1.25rem] leading-6'>234</h4>
              <h6 className='font-[600] text-[#919EAB] text-[0.8rem] '>New Message</h6>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-6 my-6'>
        <div className='w-full md:w-[70%] bg-[#FFFFFF] px-5 py-4 shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)]'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign='top' height={36} />
              <Line type='monotone' dataKey='Revenue' stroke='#ffbb33' strokeWidth={2} />
              <Line type='monotone' dataKey='UserAcess' stroke='#EA4335' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='w-full md:w-[30%] bg-[#FFFFFF] px-5 py-4 shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)]'>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={data_PiaChart}
                cx='50%'
                cy='50%'
                dataKey='value'
                fill='#8884d8'
                labelLine={false}
                outerRadius={120}
              >
                {data_PiaChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign='bottom' layout='horizontal' align='center' iconType='circle' />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDashboard
