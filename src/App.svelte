<script lang="ts">
  import Drawer, {
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
  } from "@smui/drawer";
  import Button, { Label } from "@smui/button";
  import List, { Item, Text } from "@smui/list";

  let open = false;
  let active = "Gray Kittens";

  function setActive(value: string) {
    active = value;
  }
</script>

<!-- <script lang="ts">
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import Drawer from "@smui/drawer";

  import { onMount } from "svelte";

  // import Display from "./lib/Display.svelte";
  // import StatusBar from "./lib/StatusBar.svelte";
  import type { EnumberationDefinition } from "./types";

  let drawer = false;
  let enum_defs: EnumberationDefinition[] = [];
  let selected_enum_def_index = -1;

  let current_descriptions: string[] = [];
  $: if (selected_enum_def_index === -1) current_descriptions = [];
  else if (enum_defs.length <= selected_enum_def_index)
    current_descriptions = [];
  else current_descriptions = enum_defs[selected_enum_def_index].descriptions;

  onMount(() => {
    enum_defs = window.utools.dbStorage.getItem("enum_defs") || [];
  });

  const handleDeleteEnumDef = function (index: number) {
    // $confirm("确定删除 " + enum_defs[index].name + " ？", "确认", {
    //   confirmButtonText: "确认",
    //   cancelButtonText: "取消",
    //   type: "warning",
    // }).then(() => {
    //   if (index === selected_enum_def_index) {
    //     selected_enum_def_index = -1;
    //   }
    //   if (index < selected_enum_def_index) {
    //     selected_enum_def_index -= 1;
    //   }
    //   enum_defs.splice(index, 1);
    //   window.utools.dbStorage.setItem("enum_defs", enum_defs);
    // });
  };

  const handleAddEnumDef = async function () {
    // let name = "";
    // let value = "";
    // try {
    //   name = await $prompt("输入枚举名", "添加", {
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //   });
    //   try {
    //     value = await $prompt("输入枚举值，英文逗号分隔", "添加", {
    //       confirmButtonText: "确认",
    //       cancelButtonText: "取消",
    //       inputPlaceholder: "示例：比特位1,比特位2,比特位3",
    //     });
    //     enum_defs.push({
    //       name: name.value,
    //       descriptions: value.value.split(","),
    //     });
    //     window.utools.dbStorage.setItem("enum_defs", enum_defs);
    //   } catch {
    //     console.log();
    //   }
    // } catch {
    //   console.log();
    // }
  };
</script>

<Drawer variant="dismissible" bind:open={drawer} title="枚举定义列表">
  <div class="setting-drawer">
    <div class="setting-enumdef-list">
      {#each enum_defs as enum_def, idx}
        <div class="setting-enumdef-list-item">
          <span>{enum_def.name}</span>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            on:click={() => handleDeleteEnumDef(idx)}
          >
            <path d="M6 12V6H7V12H6Z" fill="currentColor" fill-opacity="0.9" />
            <path d="M9 6V12H10V6H9Z" fill="currentColor" fill-opacity="0.9" />
            <path
              d="M10.5 3H14V4H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V4H2V3H5.5L5.5 1.8C5.5 1.35817 5.85817 1 6.3 1H9.7C10.1418 1 10.5 1.35817 10.5 1.8V3ZM6.5 3H9.5L9.5 2L6.5 2V3ZM4 4V14H12V4H4Z"
              fill="currentColor"
              fill-opacity="0.9"
            />
          </svg>
        </div>
      {/each}
    </div>
    <div class="setting-enumdef-adder">
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        on:click={handleAddEnumDef}
      >
        <path
          d="M7.5 8.5H4.5V7.5H7.5V4.5H8.5V7.5H11.5V8.5H8.5V11.5H7.5V8.5Z"
          fill="currentColor"
          fill-opacity="0.9"
        />
        <path
          d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z"
          fill="currentColor"
          fill-opacity="0.9"
        />
      </svg>
    </div>
  </div>
</Drawer>
<main>
  <!-- <Display :descriptions="currentDescriptions" />
  <StatusBar
    :enum_defs="enum_defs"
    v-model="selected_enum_def_index"
    @onSetting="drawer = true"
  /> -->
<!-- <Button on:click={() => (drawer = !drawer)}>click me</Button>
</main> -->

<div class="drawer-container">
  <Drawer variant="dismissible" bind:open>
    <Header>
      <Title>Super Drawer</Title>
      <Subtitle>It's the best drawer.</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Gray Kittens")}
          activated={active === "Gray Kittens"}
        >
          <Text>Gray Kittens</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("A Space Rocket")}
          activated={active === "A Space Rocket"}
        >
          <Text>A Space Rocket</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("100 Pounds of Gravel")}
          activated={active === "100 Pounds of Gravel"}
        >
          <Text>100 Pounds of Gravel</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("All of the Shrimp")}
          activated={active === "All of the Shrimp"}
        >
          <Text>All of the Shrimp</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("A Planet with a Mall")}
          activated={active === "A Planet with a Mall"}
        >
          <Text>A Planet with a Mall</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <AppContent class="app-content">
    <main class="main-content">
      <Button on:click={() => (open = !open)}
        ><Label>Toggle Drawer</Label></Button
      >
      <br />
      <pre class="status">Active: {active}</pre>
    </main>
  </AppContent>
</div>

<!-- <style lang="scss">
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    overflow-x: hidden;
  }

  #app {
    margin: 0;
    position: absolute;
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }

  .setting-drawer {
    margin-right: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .setting-enumdef-list-item {
    margin: 10px;

    span {
      user-select: none;
    }

    svg {
      float: right;
      cursor: pointer;
    }
  }

  .setting-enumdef-adder {
    margin-top: auto;

    svg {
      margin: 1em;
      float: right;
      cursor: pointer;
    }
  }
</style> -->
<style>
  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    position: relative;
    display: flex;
    height: 350px;
    max-width: 600px;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
</style>
