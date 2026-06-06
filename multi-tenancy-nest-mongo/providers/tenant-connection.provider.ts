import { InternalServerErrorException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

// this custom provider solves the issue of switching database
// in service level .. 

export const tenantConnectionProvider = {
  provide: 'TENANT_CONNECTION',
  useFactory: async (request, connection: Connection) => {
    if (!request.tenantId) {
      throw new InternalServerErrorException(
        'Make sure to apply tenantsMiddleware',
      );
    }
    return connection.useDb(`tenant_${request.tenantId}`);
  },
  inject: [
    REQUEST, // because REQUEST have tenantId which comes from middleware 
    getConnectionToken() // getting connection to mongoose database
  ],
};