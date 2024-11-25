<script lang="ts">
	import '../app.css';
  import {page} from '$app/stores'
  $: hideMenu = $page.data?.hideMenu;

</script>
{#if !hideMenu}
    <div class="drawer lg:drawer-open" data-theme="light">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle hidden"/>
        <div class="drawer-content">
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
                Menu
            </label>
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="menu bg-base-200 text-center min-h-full p-0 w-80 flex flex-col items-center">
                <!-- Sidebar content here -->
                <div class="profile mt-12">
                    <div class="avatar">
                            <img src="/jeel.png" alt="">
                    </div>
                    <a target="_blank" href="https://0xbytes.dev">
                        <p class="text-2xl font-bold text-gray-500">0xbytes</p>
                    </a>
                    <i class="text-xs">Everything Web</i>
                </div>
                <ul class="w-full flex flex-col items-center mt-8" >
                    <li class="nav-item p-1 w-full">
                        <a href="/" class="nav-link flex justify-center w-full">
                            <span class="text-base">HOME</span>
                        </a>
                    </li>
                    <li class="nav-item p-1 w-full">
                        <a href="/categories" class="nav-link flex justify-center w-full">
                            <span class="text-base">CATEGORIES</span>
                        </a>
                    </li>
                    <li class="nav-item p-1 w-full">
                        <a href="/create" class="nav-link flex justify-center w-full">
                            <span class="text-base">CREATE</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
{:else}
    <slot></slot>
{/if}