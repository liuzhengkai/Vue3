<script setup>
import { onMounted, onScopeDispose } from 'vue'
import { dsUtils } from '../../utils/dsUtils.js'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(()=> {
    dsUtils.requestToken({
        url: 'osg-uc0012/member/c2/f01',
        data: {
            uscInfo: {
                devciceId: "861761033034989",
                member: "2202",
                tenant: "state_grid",
                deviceIp: "211.160.250.38"
            },
            quInfo: {
                password: "18e0e5f3389efa0b31738c2fd44630d8",
                account: "13323497937",
                addressCity: 110100,
                optSys: "ios",
                addressRegion: 110101,
                addressProvince: 110100,
                pushId: "1a0018970ab49abf389"
            }
        },
        isResponseAll: true,
        code: 1
    }).then(res=> {
        if(res?.data?.bizrt?.token) {
            window.localStorage.setItem("token",res?.data?.bizrt?.token)
            router.push('elelist')
        }
    }).catch(err=> {
        console.log('err',err)
    })
})
    
</script>