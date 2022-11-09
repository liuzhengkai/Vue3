<template>
    <div class="eleList">
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { dsUtils } from '../../../utils/dsUtils'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(()=> {
    dsUtils.request({
        url: 'osg-p0002/member/p1/f01',
        data: {
            TYPE: '0'
        },
        isResponseAll: true
    }).then((res)=> {
        
    })
})

    
</script>

<style lang="scss" scoped>
    .eleList {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
</style>