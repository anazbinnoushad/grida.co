import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import React, { useCallback } from "react";
import { Flex } from "theme-ui";

import { GroupEntity } from "../headermap";
import { LineItem } from "../line-item";
import { ModuleGroup, ModuleItem } from "../modules";
import { ProductItem } from "../product";

function HoverMenu({
  item,
  isExpand,
  onExit,
  type,
}: {
  item: GroupEntity;
  isExpand: boolean;
  onExit: () => void;
  type: "mobile" | "desktop";
}) {
  const { t } = useTranslation(["common", "header"]);

  const close = useCallback(() => {
    onExit();
  }, []);

  const onModalInnerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <React.Fragment>
      {type === "desktop" && (
        <Container data-expanded={isExpand}>
          <ModalBackground onClick={close}>
            <HoverView
              onMouseLeave={close}
              bg="white"
              onClick={onModalInnerClick}
            >
              <ExpandHeaderContent
                sx={{
                  height: "100%",
                  width: ["320px", "730px", "985px", "1040px"],
                }}
              >
                {item.children.map((i, index) => {
                  const label = t(i.label);
                  switch (i.layout) {
                    case "module-group": {
                      return <ModuleGroup key={index} {...i} />;
                    }
                    case "module-item":
                      return (
                        <ModuleItem
                          key={index}
                          label={label}
                          icon={i.icon}
                          href={i.href}
                        />
                      );
                    case "product-item":
                      return (
                        <ProductItem
                          key={index}
                          label={label}
                          href={i.href}
                          tagline={t(i.tagline)}
                        />
                      );
                    case "line-item":
                    default:
                      return <LineItem key={index} {...i} label={label} />;
                  }
                })}
              </ExpandHeaderContent>
            </HoverView>
          </ModalBackground>
        </Container>
      )}
      {type === "mobile" && (
        <Container
          data-expanded={isExpand}
          style={{
            flexDirection: "column",
          }}
          mt="12px"
          mb="24px"
        >
          {item.children.map((i, index) => (
            <ProductItem
              key={index}
              icon="mockIcon"
              label={i.label}
              href={i.href}
              tagline="Tell customer about this product. Keep it simple"
            />
          ))}
        </Container>
      )}
    </React.Fragment>
  );
}

export default HoverMenu;

const Container = styled(Flex)`
  opacity: 0;
  pointer-events: none;

  &[data-expanded="true"] {
    opacity: 1;
    pointer-events: auto;
  }

  transition: all 0.1s ease-in-out;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1050;
`;

const HoverView = styled(Flex)`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  box-shadow: 4px 6px 20px 0 rgba(0, 0, 0, 0.09);
  align-items: center;
  justify-content: center;
`;

const ExpandHeaderContent = styled(Flex)`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-row-gap: 21px;
  padding-top: 21px;
  padding-bottom: 64px;
`;