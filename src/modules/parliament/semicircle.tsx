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
  let jsxSVG: string | ReactElement = '';
  if (Object.values(parties).map(p => p.seats).reduce((a, b) => a + b) > 1) {
    console.log(parties)
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
    jsxSVG = new HtmlToReactParser().parse(optimizedSVG);
  } else {
    console.log(parties);
    jsxSVG = <svg viewBox="-26.283 -26.283 52.566 32.566">
      <circle
        cx="0"
        cy="-10"
        r="5"
        fill={Object.entries(parties)[0][1].colour}
      />
      <text
        style={{
          fontSize: "5px",
        }}
        x="-1.5"
        cy="0"
      >
        1
      </text>
    </svg>;
  }

  return (
    <Container>
      {jsxSVG}
    </Container>
  );
}

export default Semicircle;