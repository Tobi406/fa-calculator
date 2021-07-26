import { FC, ReactElement } from "react";
import styled from "styled-components";

const parliamentSVG = require('parliament-svg');
const toHTML = require('vdom-to-html');
const HtmlToReactParser = require('html-to-react').Parser;
const svgo = require('node_modules/svgo/dist/svgo.browser');

interface Party {
  seats: number,
  colour: string,
}

type Parties = {
  [key: string]: Party,
}

const Container = styled.div`
  > svg * {
    transition: all .5s ease-in-out;
  }
`;


const Semicircle: FC<{
  parties: Parties,
}> = ({ parties }): ReactElement => {
  let svg = parliamentSVG(parties, true);
  let htmlSVG = toHTML(svg);
  const optimizedSVG = svgo.optimize(htmlSVG, {
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeEditorsNSData',
      'cleanupAttrs',
      'mergeStyles',
      'inlineStyles',
      'minifyStyles',
      'cleanupIDs',
      'removeUselessDefs',
      'cleanupNumericValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'convertEllipseToCircle',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'removeUnusedNS',
      'sortDefsChildren',
      'removeTitle',
      'removeDesc',
      {
        name: 'removeAttrs',
        params: {
          attrs: 'class',
        },
      },
    ],
  }).data;
  const jsxSVG = new HtmlToReactParser().parse(optimizedSVG);

  return (
    <Container>
      {jsxSVG}
    </Container>
  );
}

export default Semicircle;