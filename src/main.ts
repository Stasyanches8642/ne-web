import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(urlencoded({ extended: true }));

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(process.cwd(), 'views', 'layouts'),
      partialsDir: join(process.cwd(), 'views', 'partials'),
      helpers: {
        eq: (a: unknown, b: unknown) => a === b,
        array: (...args: unknown[]) => args.slice(0, -1),
      },
    }),
  );
  app.setViewEngine('hbs');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`The application is running on port ${port}`);
}
bootstrap();
