
function checkPhone(req: {
  phone: string;
}) {
  console.log('校验手机');
  return new Promise<boolean>((res, rej) => {
      const num = Math.random() * 100;

      if( num >= 50) {
        res(true)
      } else if(num> 20 && num < 50)  {
        res(false);
      } else {
        rej('接口错误')
      }
  })
}

function checkPhoneCode(req: {
  code: string
}) {
  console.log('校验手机验证码');
  return new Promise<boolean>((res, rej) => {
      const num = Math.random() * 100;

      if( num >= 50) {
        res(true)
      } else if(num> 20 && num < 50)  {
        res(false);
      } else {
        rej('接口错误')
      }
  })
}

/**
 * Api包装器
 */
export function useApi() {
  return {
    checkPhone,
    checkPhoneCode,
  }
}