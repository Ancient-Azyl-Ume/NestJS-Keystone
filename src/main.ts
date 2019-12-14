import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Keystone } from '@keystonejs/keystone';
import { GraphQLApp }  from '@keystonejs/app-graphql';
import { AdminUIApp }  from '@keystonejs/app-admin-ui';

import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import { Text } from '@keystonejs/fields';


const PROJECT_NAME = "Keystone NestJs";




const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new MongooseAdapter(),
});

const apps = [
  new GraphQLApp(),
  new AdminUIApp(),
];

keystone.createList('Todo', {
  fields: {
    name: { type: Text },
  }
});

keystone
  .prepare({ apps, dev: process.env.NODE_ENV !== 'production' })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const app = await NestFactory.create(AppModule);
    app.use(middlewares).listen(3000);
});
/*async function bootstrap() {
  
}
bootstrap();*/