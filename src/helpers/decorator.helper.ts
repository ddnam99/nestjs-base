import { Controller, SetMetadata } from '@nestjs/common';

export const AllowAnonymous = () => SetMetadata('AllowAnonymous', true);

export const CmsController = (controllerName: string = ''): ClassDecorator => (target: any) => {
  Controller(`api/cms/${controllerName}`)(target);
};

export const MobileController = (controllerName: string = ''): ClassDecorator => (target: any) => {
  Controller(`api/mobile/${controllerName}`)(target);
};

export const CommonController = (controllerName: string = ''): ClassDecorator => (target: any) => {
  Controller(`api/${controllerName}`)(target);
};
