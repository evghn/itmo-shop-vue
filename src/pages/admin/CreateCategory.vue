<script setup>
import router from '@/router';


const handleCreate = () => {
  router.push()
}
</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">Basic Form Elements</h3>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label class="form-label">Text Input</label>
          <input type="text" class="form-control" placeholder="Enter text...">
        </div>

        <div class="form-group">
          <label class="form-label">Email Input</label>
          <input type="email" class="form-control" placeholder="name@example.com">
          <p class="form-text">We'll never share your email with anyone else.</p>
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" placeholder="Enter password...">
        </div>

        <div class="form-group">
          <label class="form-label">Textarea</label>
          <textarea class="form-control" rows="3" placeholder="Enter your message..."></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Select</label>
          <select class="form-control">
            <option value="">Choose an option...</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">File Input</label>
          <input type="file" class="form-control">
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>