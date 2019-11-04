<template>
<div>
        <div class="title">
            <el-input v-model="input" placeholder="发挥你吃货的想象力^_^" />
            <el-button class="btn" type="primary" @click='search' icon="el-icon-search">我要吃</el-button>
        </div>
        <div class="content">
            <el-row class="main" >
                <el-col class="col" :span="11" v-for="(item, index) in list" :key="index" :class="getClass(index)"  >
                    <el-card :body-style="{ padding: '0px' }" >
                    <img :src="item.pic" class="image" @click="getDetail(list[index].id)">
                    <div style="padding: 14px;" @click="getDetail(list[index].id)">
                        <span>{{item.name}}</span>
                        <div class="bottom clearfix">
                     
                        <el-tag size='medium '>{{item.tag}}</el-tag>
                        </div>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
        </div >

         <div class="test" v-if="centerDialogVisible" >小厨尽力了╯﹏╰</div>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
    data(){
        return{
           input:'',
           list:[],
           text:'小厨正在努力搜索...',
          centerDialogVisible:false,
        
         
        }
    },
    mounted() {
        this.list = JSON.parse(localStorage.getItem("list")) 
    },
    methods: {
        getClass(index){
            // eslint-disable-next-line no-console
            if(index%2 != 0 && index!= 0){
                return 'right'
            }else{
                return 'left'
            }
        },
        isnull(val) {
            var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
            if (str == '' || str == undefined || str == null) {
            
                return true;      
                
                } else {
                
                    return false;
                    
                }
        },
        search(){
               // eslint-disable-next-line no-console
               var $that = this
               
              
                    const loading = this.$loading({
                        lock: true,
                        text: $that.text,
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    // eslint-disable-next-line no-console
                axios({
                    url:'api/search?keyword='+$that.input+'&num=20&appkey=92b0baa2be94f923de858a5c3dc77d66'
                }).then(res=>{
                    // eslint-disable-next-line no-console
                    // console.log(res.data.result.result.list)
                    // eslint-disable-next-line no-empty
                    // eslint-disable-next-line no-console
                  
                    if(res.data.result.msg == 'ok'){
                        this.list = res.data.result.result.list
                      this.list.map((item,index)=>{
                        // eslint-disable-next-line no-console
                      localStorage.setItem("list", JSON.stringify(res.data.result.result.list) );
                      // eslint-disable-next-line no-unused-vars
                      var lastname = localStorage.getItem("list");
                      // eslint-disable-next-line no-console
                    //   console.log(lastname)
                        var tag =  item.tag.split(',')
                        // eslint-disable-next-line no-console
                        if(tag.length >3){
                            tag.splice(3,100)
                        }
                        
                        // eslint-disable-next-line no-console
                        // console.log(tag)
                       tag =  tag.join('  ')
                        // eslint-disable-next-line no-console
                        // console.log(this.list[index])

                       this.list[index].tag = tag
                      })
                        // eslint-disable-next-line no-console
                        // console.log(this.list)
                       
                    }else{
                       // eslint-disable-next-line no-console
                        // this.$message({
                        // message: '小厨没有搜索到结果(╯□╰)',
                        // center: true
                        // });
                        // const loading1 = this.$loading({
                        //     lock: true,
                        //     text: '小厨没有搜索到结果(╯□╰)',
                        //     spinner: 'el-icon-loading',
                        //     background: 'rgba(0, 0, 0, 0.7)'
                        // });
                        // setTimeout(()=>{
                        //     loading1.close()
                        // },2000)
                        //  this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
                        //     dangerouslyUseHTMLString: true
                        // });
                        this.centerDialogVisible= true
                        setTimeout(()=>{
                         
                            this.centerDialogVisible= false
                        },2000)
                    }
                   loading.close();
                   
                
                })
               
        },
        getDetail(id){
            // eslint-disable-next-line no-console
            // console.log(index)
            this.$router.push({name:"detail",query:{id:id}});
        }
    },
}
</script>

<style lang="scss" scoped>

    .root{
        width: 100%;
        height:100%;
       
    }
    .title{
         width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .btn{
           margin-left: 15px
            
        }
    }


  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .content{
      width: 100%;
     
    
  }
  .main{
      width:100%;
      height: auto;
    
    .col{
      
       margin-top: 10px;
    // //   margin-right:10px
    // margin: 10px 
    }
      
  }
  .right{
      float: right;
      margin-right:0.3rem; 
  }
  .left{
        margin-left:0.3rem; 
  }
.test{
    width: 200px;
    height: 100px;
    background: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    z-index: 999;
    left: 25%;
    top:45%;
    border-radius: 20px;
    text-align: center;
    line-height: 100px;
    color: #fff;
    animation: myfirst 1s;
}
@keyframes myfirst
{
  0%   {opacity:0;}
  40%  {opacity:0.75;}
  100% {opacity:1;}
}

</style>