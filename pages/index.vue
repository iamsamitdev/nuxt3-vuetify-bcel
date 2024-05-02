<script setup lang="ts">

    // รับค่าจากฟอร์ม
    const email = ref('samit@email.com')
    const password = ref('123456')

    // useRouter สำหรับการเปลี่ยนหน้า
    const router = useRouter()

    // Sweet Alert
    const { $swal }: any = useNuxtApp()

    // useCookies สำหรับเก็บค่า token
    const token = useCookie('token', {
        maxAge: 60 * 60 , // 1 hour
    })

    // useRules สำหรับตรวจสอบความถูกต้องของข้อมูล
    const { ruleEmail, rulePassLen, ruleRequired } = useFormRules()

    // submit ฟอร์ม
    const submit = async () => {
        // console.log(ruleEmail(email.value))
        if(
            ruleRequired(email.value) == true && 
            ruleEmail(email.value) == true && 
            rulePassLen(password.value) == true
        ) {
            
            // useRuntimeConfig() for get env
            const config = useRuntimeConfig()
            const STRAPI_URL: string = config.public.strapi.url

            // console.log(STRAPI_URL)

            // login strapi with useFetch
            useFetch(
                `${STRAPI_URL}/auth/local`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "identifier": email.value,
                        "password": password.value
                    }),
                    onResponse({ request, response, options }) {
                        console.log(response)
                        if(response.status === 400){
                            // alert("Error 400")
                            // Sweet Alert Dialog
                            $swal.fire({
                                icon: 'error',
                                title: 'เข้าสู่ระบบไม่สำเร็จ',
                                text: 'กรุณาตรวจสอบอีเมล์และรหัสผ่านของคุณ',
                                confirmButtonText: 'ปิดหน้าต่าง'
                            })
                        } else {
                           // set token to cookie
                           token.value = response._data.jwt

                           let timerInterval: any
                           $swal.fire({
                                title: 'กำลังเข้าสู่ระบบ',
                                html: 'กรุณารอสักครู่ <b></b> วินาที',
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    $swal.showLoading()
                                    timerInterval = setInterval(() => {
                                        const content = $swal.getHtmlContainer()
                                        if (content) {
                                            const b = content.querySelector('b')
                                                if (b) {
                                                b.textContent =$swal.getTimerLeft() / 1000
                                            }
                                        }
                                    }, 100)
                                },
                                willClose: () => {
                                    clearInterval(timerInterval)
                                }
                           }).then(() => {
                                // redirect to dashboard
                                router.push('/backend/dashboard')
                           })

                        }
                    },
                }
            )
        }
    }

    useHead({
        title: 'Login',
        meta: [
            {
                name: 'description',
                content: 'Login page'
            }
        ]
    })
</script>

<template>
    <VContainer fluid class="fill-height pa-0">
        <VRow no-gutters align="center" justify="center" class="fill-height">
            <VCol class="hidden-sm-and-down fill-height" md="6" lg="6">
                <VImg
                    src="https://wallpaper.dog/large/5557744.jpg"
                    cover
                    class="h-100 rounded-xl rounded-ts-0 rounded-bs-0 d-flex align-center justify-center"
                >
                    <div class="text-center w-50 text-white mx-auto">
                        <h1 class="mb-4">Welcome back.</h1>
                        <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </VImg>
            </VCol>
            <VCol cols="12" md="6" lg="6" sm="6">
                <VRow no-gutters align="center" justify="center">
                    <VCol cols="12" md="6" class="pa-3">
                        <h1>Login</h1>
                        <p class="text-medium-emphasis">Input your email and password</p>
                        <VForm @submit.prevent="submit" class="mt-7">
                            <div class="mt-1">
                                <VTextField 
                                    v-model="email"
                                    :rules="[ruleRequired, ruleEmail]"
                                    label="Email" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-email"
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    v-model="password"
                                    :rules="[ruleRequired, rulePassLen]"
                                    label="Password" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div class="mt-5 text-center">
                                <VBtn type="submit" 
                                    block
                                    min-height="44" 
                                    class="gradient primary"
                                    >
                                    Login
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>Don't have an account? </span>
                            <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>

</style>