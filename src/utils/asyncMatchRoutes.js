import { matchRoutes } from 'react-router-config';

function getComponents(match) {
  const m = match.map(v => v.route.component);
  // --------------------------------------------
  return m.reduce(async (result, component) => {
    if (component.preload) {
      const res = await component.preload();
      const ret = [...(await result), component, ...[].concat(res)];
      return ret;
    }
    return [...(await result), component];
  }, []);
}

function getParams(match) {
  return match.reduce((result, component) => {
    if (component.match && component.match.params) {
      return { ...result, ...component.match.params };
    }
    return result;
  }, {});
}

const asyncMatchRoutes = async (routes, pathname) => {
  const match = matchRoutes(routes, pathname);
  // const params = getParams(match);
  const components = await getComponents(match);
  console.log('>>>>>>>>>>>>>>>> asyncMatchRoutes > asyncMatchRoutes > pathname: ', pathname);
  console.log('>>>>>>>>>>>>>>>> asyncMatchRoutes > asyncMatchRoutes > match: ', match);
  console.log('>>>>>>>>>>>>>>>> asyncMatchRoutes > asyncMatchRoutes > components: ', components);
  // console.log('>>>>>>>>>>>>>>>> asyncMatchRoutes > asyncMatchRoutes > params: ', params);
  return { components, match };
};

export default asyncMatchRoutes;
