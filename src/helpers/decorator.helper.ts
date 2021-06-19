import { Controller, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const AllowAnonymous = () => SetMetadata('AllowAnonymous', true);

export const CmsController =
  (controllerName: string = ''): ClassDecorator =>
  (target: any) => {
    ApiBearerAuth()(target);
    ApiTags(controllerName)(target);
    Controller(`api/cms/${controllerName}`)(target);
  };

export const MobileController =
  (controllerName: string = ''): ClassDecorator =>
  (target: any) => {
    ApiBearerAuth()(target);
    ApiTags(controllerName)(target);
    Controller(`api/mobile/${controllerName}`)(target);
  };

export const CommonController =
  (controllerName: string = ''): ClassDecorator =>
  (target: any) => {
    ApiBearerAuth()(target);
    ApiTags(controllerName)(target);
    Controller(`api/${controllerName}`)(target);
  };
