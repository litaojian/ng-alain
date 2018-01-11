
import { FormControl, FormGroup } from '@angular/forms';
/**
 * 自定义验证器(其实就是一个函数,一个返回任意对象的函数)
 * 传递的参数是当前需要验证的表单的FormControl
 * 通过传递的参数获取当前表单输入的值
 */
export function mobileValidator(control: FormControl): any {
  console.dir(control);
  // 获取到输入框的值
  const val = control.value;
  // 手机号码正则
  const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  const result = mobieReg.test(val);
  return result ? null : { mobile: { info: '手机号码格式不正确' } };
}
 