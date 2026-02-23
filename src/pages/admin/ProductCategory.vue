<script setup>
import router from '@/router';


const handleCreate = () => {
    router.push({name: "category-create"})
}
</script>
<template>
<div class="card mb-6">
          <div class="card-header">
            <h3 class="text-lg font-medium text-gray-800">Категории товаров</h3>
          </div>
          <div class="mb-2 mt-4 ">
            <button class="btn btn-outline-success ml-3 cursor-pointer" @click="handleCreate">Создать категорию</button>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div class="flex items-center gap-3">
                        <img src="https://ui-avatars.com/api/?name=John+Doe&amp;background=3b82f6&amp;color=fff" class="w-8 h-8 rounded-full" alt="John Doe">
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>john@example.com</td>
                    <td>Admin</td>
                    <td><span class="badge badge-success">Active</span></td>
                    <td>
                      <div class="flex gap-1">
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <div class="flex items-center gap-3">
                        <img src="https://ui-avatars.com/api/?name=Jane+Smith&amp;background=10b981&amp;color=fff" class="w-8 h-8 rounded-full" alt="Jane Smith">
                        <span>Jane Smith</span>
                      </div>
                    </td>
                    <td>jane@example.com</td>
                    <td>Editor</td>
                    <td><span class="badge badge-success">Active</span></td>
                    <td>
                      <div class="flex gap-1">
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <div class="flex items-center gap-3">
                        <img src="https://ui-avatars.com/api/?name=Bob+Johnson&amp;background=ef4444&amp;color=fff" class="w-8 h-8 rounded-full" alt="Bob Johnson">
                        <span>Bob Johnson</span>
                      </div>
                    </td>
                    <td>bob@example.com</td>
                    <td>User</td>
                    <td><span class="badge badge-warning">Pending</span></td>
                    <td>
                      <div class="flex gap-1">
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <div class="flex items-center gap-3">
                        <img src="https://ui-avatars.com/api/?name=Alice+Brown&amp;background=8b5cf6&amp;color=fff" class="w-8 h-8 rounded-full" alt="Alice Brown">
                        <span>Alice Brown</span>
                      </div>
                    </td>
                    <td>alice@example.com</td>
                    <td>User</td>
                    <td><span class="badge badge-danger">Inactive</span></td>
                    <td>
                      <div class="flex gap-1">
                        <button class="btn btn-sm btn-outline-primary">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
</template>