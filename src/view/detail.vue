<template>
<div>
    <div class="title_top">
      <i class="el-icon-arrow-left" @click="goBack" style="font-size:16px;margin-left:5px;float:left;"></i>
        <p>小厨课堂开课啦</p>
    </div>

  <div class="top">
       
            <img style="width:160px;height:160px" :src="detail.pic" />
        <div class="right_top">
            <p style="margin:0">名称：{{detail.name}}</p>
                <div style="display:flex">
                    <span class="demonstration">评分：</span>
                    <el-rate
                        :value="value3"
                        disabled
                        :allow-half='true'
                        :colors="colors">
                    </el-rate>
                </div>
             <el-tag size='medium '>{{detail.tag}}</el-tag>
            <el-button type="primary" style="width:90%"  :loading="isshoucang" plain @click="shoucang1">{{shoucang}}</el-button>
           
        </div>       
        
    </div>
       
<el-collapse style="border-top:none">
  <el-collapse-item title="美味简介" name="1" >
        <template slot="title">
      美味简介<i class="header-icon el-icon-dish" style="font-size:16px;margin-left:5px"></i>
    </template>
    <div v-html="detail.content"></div>
  </el-collapse-item>
   <el-collapse-item title="可控 Controllability">
   <template slot="title">
      食材准备<i class="header-icon el-icon-food" style="font-size:16px;margin-left:5px"></i>
    </template>
    <!-- <div>
    <span>名称</span>
    <el-divider direction="vertical"></el-divider>
    <span>数量</span>
    <el-divider direction="vertical"></el-divider>
    <span>类型</span>
  </div> -->
    <el-row type="flex" class="row-bg" style="text-align:center" justify="space-around">
    <el-col :span="7" style="color:#409EFF"><div class="grid-content bg-purple" ></div>名称</el-col>
    <el-col :span="7" style="color:#409EFF"><div class="grid-content bg-purple-light">数量</div></el-col>
    <el-col :span="7" style="color:#409EFF"><div class="grid-content bg-purple"></div>类型</el-col>
    </el-row>
    <div v-for="(item,index) in material" :key="index">
         <el-row type="flex" class="row-bg" style="text-align:center" justify="space-around">
        <el-col :span="7"><div class="grid-content bg-purple"></div>{{item.mname}}</el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">{{item.amount}}</div></el-col>
        <el-col :span="7" ><div class="grid-content bg-purple"></div>{{item.type/2==0? '辅材' : '主材'}}</el-col>
    </el-row>
    </div>
  </el-collapse-item>
    <el-collapse-item>
    <template slot="title">
      制作流程<i class="header-icon el-icon-fork-spoon" style="font-size:16px;margin-left:5px"></i>
    </template>
                    <el-timeline style="margin:0;padding-left:2px" v-for="(item,index) in process" :key='index'>
                        <el-timeline-item  color='' size='large' :icon='item.icon'   type='primary'  :timestamp="'第'+ parseInt(index+1)+'步'" placement="top">
                            <el-card>
                                <!-- <img  :src='item.pic' /> -->
                                <el-image 
                               
                                    :src='item.pic'
                                    :preview-src-list="srcList1"
                                    :z-index="5000"
                                    :lazy='true'
                                >
                                </el-image>
                                <p>{{item.pcontent}}</p>
                            </el-card>
                        </el-timeline-item>
                </el-timeline>
  </el-collapse-item>
</el-collapse>

</div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
    data(){
        return {
            id:'',
            // value:"",
            detail:{},
             src:'',
             material:[],//配料
             process:[],//过程
             srcList:[],//图片预览
              value1: null,
            value2: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
            shoucang:'收藏',
            isshoucang:false,
            falg:true,
            type_sucai:'',
            icon_list:['el-icon-shopping-cart-full','el-icon-odometer','el-icon-thumb','el-icon-watch','el-icon-bicycle','el-icon-cold-drink','el-icon-wind-power'],
            srcList1: [],
            value3:0//随机一个评分
           
        }
    },
    methods: {
      // eslint-disable-next-line vue/no-dupe-keys
      shoucang1(){
          this.shoucang = ''
          this.isshoucang = true
          this.falg = !this.falg
          if(this.falg){
            setTimeout(()=>{
               this.shoucang = '收藏'
              
                this.isshoucang = false
               
            },2000)
          }
          if(!this.falg){
              setTimeout(()=>{
               this.shoucang = '已收藏'
                this.isshoucang = false
               
            },2000)
          }
      },
      goBack(){
          this.$router.go(-1)
      }
    },
    mounted() {
        // this.id = this.$route.params.id
          this.id = this.$route.query.id; //接收参数
          const loading = this.$loading({
                lock: true,
                text: '小厨正在努力搜索...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
          });
        // eslint-disable-next-line no-console
        axios({
            url:'api/detail?id='+this.id+'&appkey=92b0baa2be94f923de858a5c3dc77d66'
        }).then(res=>{
            // eslint-disable-next-line no-console
            console.log(res.data.result.result)
            this.detail = res.data.result.result
            this.srcList.push(res.data.result.result.pic)
            this.material = res.data.result.result.material
            this.process = res.data.result.result.process // 制作过程
            this.process.map((item,index)=>{
               // eslint-disable-next-line no-console
               this.srcList1.push(item.pic)
             
                if(index === this.process.length-1){
                     this.process[index].icon = 'el-icon-check'
                }else{
                     item.icon = 'el-icon-more'
                     
                     // eslint-disable-next-line no-console
                   
                 
                }
                
            })

           
                        var tag =  this.detail.tag.split(',')
                        // eslint-disable-next-line no-console
                       
                        if(tag.length >3){
                            tag.splice(3,100)
                        }
                        // eslint-disable-next-line no-console
                      
                        // eslint-disable-next-line no-console
                        // console.log(tag)
                       tag =  tag.join('  ')
                        // eslint-disable-next-line no-console
                       console.log(tag)

                    this.detail.tag = tag
                var num =  Math.random()*(5-1)+1
                 num =  num.toFixed(1)
                // eslint-disable-next-line no-console
                console.log(Number(num))
              this.value3 = Number(num) 
              loading.close();

        })
       
    },
}
</script>
<style lang="scss" scoped>
  .top{
      width: 100%;
      height: 160px;
      img{
          float: left;
      }
      
  }
 .right_top{
     height: 160px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     align-items: flex-start;
     padding-left: 20px
 }
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .title_top{
      width: 100%;
     
     
     
      text-align: center;
  }
</style>