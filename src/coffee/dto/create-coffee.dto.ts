
// dto是一个对象，用于封装数据将其从一个应用发送到另一个应用
// data transfer object
// 声明对payload类型的期望，作为最佳实践文件名需要注意
// 保持不变性，使用dto

export class CreateCoffeeDto {
  readonly name: string;
  readonly brand: string;
  readonly flavors: string[];
}
