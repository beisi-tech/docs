import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '开发者学习资源',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        提供覆盖前端、后端架构、云计算等热门技术方向的系统化学习资料，
        让开发者快速上手并持续进阶。
      </>
    ),
  },
  {
    title: '核心项目矩阵',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        了解我们的创新项目，从企业级应用到开源工具，
        发现技术如何驱动业务增长与产品迭代。
      </>
    ),
  },
  {
    title: '技术社区支持',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        加入开发者社区，获取技术指导、参与代码评审，
        与行业专家共同成长。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
